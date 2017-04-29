Created by Meishu: https://github.com/baldera-mods/slash

# slash

Easy handling of slash commands.

## Users

There are three ways to use a custom slash command:

* type `` !command args `` into any chat channel
* `` /w `command args `` to send a whisper to a target starting with the command prefix
* `/w /command args` to send a whisper to a target starting with a slash

Currently the prefix `` ! `` is not settable anywhere but in the code.

If strict mode is enabled (it is by default), any message that starts with the prefix and is not a registered command will **not** be sent. If you want to send a message starting with the command prefix, put a backslash (`\`) before it and the backslash will be removed and the message sent as normal.

## Developers

To register slash commands, instantiate an object of `Slash` passing `dispatch` as the sole argument to the constructor, and then use `Slash#on(command, callback)` to register a hook.

`callback` will be passed only one parameter, `args`, which is an array of all command arguments with all HTML tags removed, HTML entities decoded, and all extra whitespace removed. `args[0]` is the command name.

`args` also has two properties:
* `raw`: the original, raw text of the slash command
* `target`: either an integer for the chat channel, or a string of the whisper target. If the whisper command syntax was used, `target` will be the whisper channel (7), otherwise it will be the name of whomever was the whisper target when the command was entered.

In all cases, `args` and `raw` will be normalized to always look like prefix form. In other words, `args[0]` will always begin with the prefix, and `raw` will always begin with either `<FONT>` and the HTML encoded prefix, or in some cases, just the HTML encoded prefix.

An instance of `Slash` has three read-only properties:
* `prefix`: the HTML encoded prefix (only `&lt;` and `&gt;` conversions)
* `prefixRaw`: the prefix without HTML encoding
* `strict`: `true` if invalid commands are silenced, false otherwise

### Example

```js
const Slash = require('slash');

module.exports = function Example(dispatch) {
  const slash = new Slash(dispatch);

  slash.on('command', (args) => {
    // ...
  });
};
```
