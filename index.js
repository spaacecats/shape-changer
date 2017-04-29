
const 	HEAD_ID = 7000001,
		GROW_ID = 7000005,
		THIGH_ID = 7000014,
		CHEST_ID = 7000012

module.exports = function ShapeChanger(dispatch) {
const {protocol} = require('tera-data-parser'),
	  Slash = require('./slash')
  let cid,
	  stack,
	  headstate = false;
  
  
 dispatch.hook('sLogin', 1, (event) => {
    cid = event.cid;
  });
  
  const slash = new Slash(dispatch)
	slash.on('sc', (args) => {
		Commands(args)
  })
	
 function Commands(args) {
	// Head
	if (args[1] == 'head'){
		shapeid = HEAD_ID;
			if(headstate === false) {
			headstate = true;
			stack = 1;
			applyChange(cid, shapeid, stack)
			return
			}	
			else 
			headstate = false;
			stack = 1;
			removeChange(cid, shapeid, stack)
			return
   }
   // Grow
   else if (args[1] == 'grow'){
		shapeid = GROW_ID;
		stack = args[2];
			if (stack == 4){
			removeChange(cid, shapeid, stack)
			return
			}
			else
			applyChange(cid, shapeid, stack)
			return
		}
	// Thighs
	else if (args[1] == 'thighs'){
		shapeid = THIGH_ID;
		stack = args[2];
			if (stack == 4){
			removeChange(cid, shapeid, stack)
			return
			}
			else
			applyChange(cid, shapeid, stack)
			return
		}
	// Chest
	else if (args[1] == 'chest'){
		shapeid = CHEST_ID;
		stack = args[2];
			if (stack == 4){
			removeChange(cid, shapeid, stack)
			return
			}
			else
			applyChange(cid, shapeid, stack)
			return
		}
	return false
	}



 function applyChange (cid, shapeid, stack){
	dispatch.toClient('S_ABNORMALITY_BEGIN', 2, {
				target: cid,
				source: cid,
				id: shapeid,
				duration: 864000000,
				unk: 0,
				stacks: stack,
				unk2: 0,
			});
	}
 function removeChange (cid, shapeid, stack){
	dispatch.toClient('S_ABNORMALITY_BEGIN', 2, {
				target: cid,
				source: cid,                      
				id: shapeid,                      //Sometimes abnormality disappears and needs to be restored before removing.
				duration: 864000000,			  //This makes sure u can restore your appearence and no abnormality icon is left in your buff bar.
				unk: 0,
				stacks: stack,
				unk2: 0,
			});
		dispatch.toClient('S_ABNORMALITY_END', 1, {
				target: cid,
				id: shapeid,
			});	
	}
}