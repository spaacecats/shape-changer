
const 	HEAD_ID = 7000001,
		GROW_ID = 7000005,
		THIGH_ID = 7000014,
		CHEST_ID = 7000012,
		MARROW_ID = 999001038,
		LACHE_ID = 97000032,
		MI_ID = 903,
		DCHILL_ID = 91101300,
		DFIRE_ID = 91100200,
		MIWINGS_ID = 3000,
		DARKAN_ID = 97950009

module.exports = function ShapeChanger(dispatch) {
const {protocol} = require('tera-data-parser'),
	  Slash = require('./slash')
  let cid,
	  stack,
	  headstate = false,
	  marrowstate = false,
	  lachestate = false,
	  miwingstate = false,
	  mistate = false,
	  chillstate = false,
	  firestate = false,
	  darkanstate = false;
  
  
 dispatch.hook('sLogin', 1, (event) => {
    cid = event.cid;
  });
  
  const slash = new Slash(dispatch)
	slash.on('sc', (args) => {
		Commands(args)
  })
	
 function Commands(args) {
	// Big Head
	if (args[1] == 'head'){
		sid = HEAD_ID;
			if(headstate === false) {
			headstate = true;
			applyChange(cid, sid, 1)
			return
			}	
			else 
			headstate = false;
			removeChange(cid, sid, 1)
			return
   }
   // Marrow Brooch black effect
   else if (args[1] == 'marrow'){
		sid = MARROW_ID;
			if(marrowstate === false) {
			marrowstate = true;
			applyChange(cid, sid, 1)
			return
			}	
			else 
			marrowstate = false;
			removeChange(cid, sid, 1)
			return
   }
   // Murderous Intent with Wings
    else if (args[1] == 'wings'){
		sid = MIWINGS_ID;
			if(miwingstate === false) {
			miwingstate = true;
			applyChange(cid, sid, 1)
			return
			}	
			else 
			miwingstate = false;
			removeChange(cid, sid, 1)
			return
   }
   // Darkan P2Wings
   else if (args[1] == 'darkan'){
		sid = DARKAN_ID;
			if(darkanstate === false) {
			darkanstate = true;
			applyChange(cid, sid, 1)
			return
			}	
			else 
			darkanstate = false;
			removeChange(cid, sid, 1)
			return
   }
   // Kelsaik's Ice
   else if (args[1] == 'ice'){
		sid = DCHILL_ID;
			if(chillstate === false) {
			chillstate = true;
			applyChange(cid, sid, 1)
			return
			}	
			else 
			chillstate = false;
			removeChange(cid, sid, 1)
			return
   }
   // Kelsaik's Fire
   else if (args[1] == 'fire'){
		sid = DFIRE_ID;
			if(firestate === false) {
			firestate = true;
			applyChange(cid, sid, 1)
			return
			}	
			else 
			firestate = false;
			removeChange(cid, sid, 1)
			return
   }
   // Lachelith debuff effect
    else if (args[1] == 'lache'){
		sid = LACHE_ID;
			if(mistate === false) {
			mistate = true;
			applyChange(cid, sid, 1)
			return
			}	
			else 
			mistate = false;
			removeChange(cid, sid, 1)
			return
   }
   // Murderous Intent
   else if (args[1] == 'mi'){
		sid = MI_ID;
			if(lachestate === false) {
			lachestate = true;
			applyChange(cid, sid, 1)
			return
			}	
			else 
			lachestate = false;
			removeChange(cid, sid, 1)
			return
   }
   // Grow
   else if (args[1] == 'grow'){
		sid = GROW_ID;
		stack = args[2];
			if (stack == 4){
			removeChange(cid, sid, stack)
			return
			}
			else
			applyChange(cid, sid, stack)
			return
		}
	// Thighs
	else if (args[1] == 'thighs'){
		sid = THIGH_ID;
		stack = args[2];
			if (stack == 4){
			removeChange(cid, sid, stack)
			return
			}
			else
			applyChange(cid, sid, stack)
			return
		}
	// Chest
	else if (args[1] == 'chest'){
		sid = CHEST_ID;
		stack = args[2];
			if (stack == 4){
			removeChange(cid, sid, stack)
			return
			}
			else
			applyChange(cid, sid, stack)
			return
		}
	// Reset All
	else if (args[1] == 'reset'){
		removeChange(cid, CHEST_ID, 4)
		removeChange(cid, GROW_ID, 4)
		removeChange(cid, THIGH_ID, 4)
		miwingstate = false;
		removeChange(cid, MIWINGS_ID, 1)
		lachestate = false;
		removeChange(cid, LACHE_ID, 1)
		headstate = false;
		removeChange(cid, HEAD_ID, 1)
		marrowstate = false;
		removeChange(cid, MARROW_ID, 1)
		mistate = false;
		removeChange(cid, MI_ID, 1)
		firestate = false;
		removeChange(cid, DFIRE_ID, 1)
		chillstate = false;
		removeChange(cid, DCHILL_ID, 1)
		darkanstate = false;
		removeChange(cid, DARKAN_ID, 1)
				
   }
	return false
	}

 function applyChange (cid, sid, stack){
	dispatch.toClient('S_ABNORMALITY_BEGIN', 2, {
				target: cid,
				source: cid,
				id: sid,
				duration: 864000000,
				unk: 0,
				stacks: stack,
				unk2: 0,
			});
	}
 function removeChange (cid, sid, stack){
	dispatch.toClient('S_ABNORMALITY_BEGIN', 2, {
				target: cid,
				source: cid,                      
				id: sid,                      	  //Sometimes abnormality disappears and needs to be restored before removing.
				duration: 864000000,		  //This makes sure u can restore your appearance and no abnormality icon is left in your buff bar.
				unk: 0,
				stacks: stack,
				unk2: 0,
			});
		dispatch.toClient('S_ABNORMALITY_END', 1, {
				target: cid,
				id: sid,
			});	
	}
}
