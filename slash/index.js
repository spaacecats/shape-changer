const S = require('./string');

const PREFIX = '!'; // editted from ` to ! 
const STRICT = false;

const map = new WeakMap();

class Slash {
  constructor(dispatch) {
    this.dispatch = dispatch;

    const base = dispatch.base || dispatch;

    if (!map.has(base)) {
      map.set(base, {});

      const runCommand = (raw, target) => {
        // construct `args` array/object
        const args = S.decodeHTMLEntities(S.stripTags(raw)).split(/\s+/);
        Object.assign(args, { raw, target });

        // run command handler
        const cmd = args[0].slice(this.prefixRaw.length).toLowerCase();
        const cb = map.get(base)[cmd];
        if (typeof cb === 'function') {
          cb(args);
          return false;
        }

        // no command handler - check if strict mode
        if (STRICT) {
          console.error('[slash] Unrecognized command:', cmd);
          return false;
        }
      };

      // check if the message begins with the command and, if so, run it
      // otherwise check if it begins with an escaped command
      const parseMessage = (event) => {
        const { message } = event;
        const pos = (message.startsWith('<FONT>') ? 6 : 0);

        if (message.startsWith(this.prefix, pos)) {
          return runCommand(message, event.target || event.channel);
        }

        // if prefix is escaped by any number of backslashes '\',
        // strip one off and send the rest as-is
        const regexp = new RegExp('^\\\\+' + S.escapeRegExp(this.prefix));
        if (regexp.test(message.slice(pos))) {
          event.message = message.slice(0, pos) + message.slice(pos + 1);
          return true;
        }
      };

      dispatch.hook('C_CHAT', 1, (event) => {
        return parseMessage(event);
      });

      dispatch.hook('C_WHISPER', 1, (event) => {
        // if prefixed command, use that first
        const res = parseMessage(event);
        if (res === false) {
          // we only check false because parseMessage() may return true if it
          // was an escaped command; in that case, we should continue as normal
          // since the whisper target might be in slash command format

          // however, if it returns false, it successfully processed the command
          // so we don't need to do anything more
          return false;
        }

        // otherwise, use whisper target
        const { target, message } = event;

        // target can begin with either '/' or the raw prefix
        // (TERA does not HTML encode whisper target)
        let pos = -1;
        if (target.startsWith('/')) {
          pos = 1;
        } else if (target.startsWith(this.prefixRaw)) {
          pos = this.prefixRaw.length;
        }

        if (pos !== -1) {
          // normalize the command string so that it looks like prefix form
          const cmd = this.prefix + target.slice(pos);

          const normalizedMessage = message.startsWith('<FONT>')
            ? `<FONT>${cmd} ${message.slice(6)}`
            : `${cmd} ${message}`;

          return runCommand(normalizedMessage, 7); // set to whisper channel
        }
      });
    }
  }

  on(command, cb) {
    const cmd = command.toLowerCase()
    const cmds = map.get(this.dispatch.base);

    if (cmds[cmd]) {
      console.warn('[slash] Overriding handler for command:', cmd);
    }

    cmds[cmd] = cb;
  }

  print(message, formatted) {
    message += ''; // cast to string
    if (!formatted) message = S.escapeHTML(message);
    this.dispatch.toClient('S_CHAT', 1, { message, channel: 206 });
  }

  get prefix() {
    return S.escapeHTML(PREFIX);
  }

  get prefixRaw() {
    return PREFIX;
  }

  get strict() {
    return STRICT;
  }
}

module.exports = Slash;
