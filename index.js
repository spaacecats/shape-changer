const Command = require('command');

const 	HEAD_ID = 7000001,					/* 99008900 - alliance winner, 99008800 - alliance hero, 77703412*/
		GROW_ID = 7000005,
		THIGH_ID = 7000014,
		CHEST_ID = 7000012,
		MARROW_ID = 999001038,
		LACHE_ID = 97000032,
		MI_ID = 903,
		DCHILL_ID = 91101300,
		DFIRE_ID = 91100200,
		MIWINGS_ID = 3000,
		RAG_ID  = 10155130,
		REAP_ID = 10151010,
		NOCT_ID = 920,
		DARKAN_ID = 97950009,
		INTI_ID = 401400
		
		
		

module.exports = function ShapeChanger(dispatch) {
    const command = Command(dispatch);
    
  let cid,	
	  headstate,
	  marrowstate,
	  lachestate,
	  miwingstate,
	  mistate,
	  chillstate,
	  firestate,
	  ragstate,
	  reapstate,
	  intistate,
	  darkanstate;
	   
 dispatch.hook('sLogin', 10, (event) => {
    cid = event.gameId;
	headstate = false, 
	marrowstate = false, 
	lachestate = false, 
	miwingstate = false,
	mistate = false, 
	chillstate = false, 
	firestate = false, 
	ragstate = false, 
	reapstate = false, 
	intistate = false,
	darkanstate = false,
	noctstate = false;
	});
	
  dispatch.hook('cReviveNow', 2, (event) => {
	timeout = setTimeout(restoreEffect, 3000)
	});
  
  function restoreEffect(){
	clearTimeout(timeout)
	if (marrowstate){
		message(` Re-applying MARROW`)
	applyChange(cid, MARROW_ID, 1)}
	if (intistate){
		message(` Re-applying INTIMIDATION`)
	applyChange(cid, INTI_ID, 1)}
	if (lachestate){
		message(` Re-applying LACHE`)
	applyChange(cid, LACHE_ID, 1)}
	if (miwingstate){
		message(` Re-applying MIWINGS`)
	applyChange(cid, MIWINGS_ID, 1)}
	if (mistate){
		message(` Re-applying MI`)
	applyChange(cid, MI_ID, 1)}
	if (chillstate){
		message(` Re-applying ICE`)
	applyChange(cid, DCHILL_ID, 1)}
	if (firestate){
		message(` Re-applying FIRE`)
	applyChange(cid, DFIRE_ID, 1)}
	if (ragstate){
		message(` Re-applying RAG`)
	applyChange(cid, RAG_ID, 1)}
	if (reapstate){
		message(` Re-applying REAP`)
	applyChange(cid, REAP_ID, 1)}
	if (darkanstate){
		message(` Re-applying DARKAN`)
	applyChange(cid, DARKAN_ID, 1)}
	if (noctstate){
		message(` Re-applying NOCT`)
	applyChange(cid, NOCT_ID, 1)}
  }
	  
    command.add('sc', (arg1, arg2) => {
        
	// Big Head
	if (arg1 == 'head'){
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
   else if (arg1 == 'marrow'){
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
    else if (arg1 == 'wings'){
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
   else if (arg1 == 'darkan'){
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
   //Intimidation
   else if (arg1 == 'inti'){
		sid = INTI_ID;
			if(intistate === false) {
			intistate = true;
			applyChange(cid, sid, 1)
			return
			}	
			else 
			intistate = false;
			removeChange(cid, sid, 1)
			return
   }
   // Kelsaik's Ice
   else if (arg1 == 'ice'){
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
   else if (arg1 == 'fire'){
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
   // Murderous Intent
    else if (arg1 == 'mi'){
		sid = MI_ID;
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
  // Lachelith debuff effect
   else if (arg1 == 'lache'){
		sid = LACHE_ID;
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
   //Blue Noct
   else if (arg1 == 'noct'){
		sid = NOCT_ID;
			if(noctstate === false) {
			lachestate = true;
			applyChange(cid, sid, 1)
			return
			}	
			else 
			noctstate = false;
			removeChange(cid, sid, 1)
			return
   }
   // Ragnarok
   else if (arg1 == 'rag'){
		sid = RAG_ID;
			if(ragstate === false) {
			ragstate = true;
			applyChange(cid, sid, 1)
			return
			}	
			else 
			ragstate = false;
			removeChange(cid, sid, 1)
			return
   }
   // Shadow Reaping
   else if (arg1 == 'reap'){
		sid = REAP_ID;
			if(reapstate === false) {
			reapstate = true;
			applyChange(cid, sid, 1)
			return
			}	
			else 
			reapstate = false;
			removeChange(cid, sid, 1)
			return
   }
   // Testing
   /*else if (arg1 == 'test'){
		sid = TEST_ID;
		stack = arg2;
			if (stack == 0){
			removeChange(cid, sid, stack)
			return
			}
			else
			applyChange(cid, sid, stack)
			return
		}*/
   // Grow
   else if (arg1 == 'grow'){
		sid = GROW_ID;
		stack = arg2;
			if (stack == 4){
			removeChange(cid, sid, stack)
			return
			}
			else
			applyChange(cid, sid, stack)
			return
		}
	// Thighs
	else if (arg1 == 'thighs'){
		sid = THIGH_ID;
		stack = arg2;
			if (stack == 4){
			removeChange(cid, sid, stack)
			return
			}
			else
			applyChange(cid, sid, stack)
			return
		}
	// Chest
	else if (arg1 == 'chest'){
		sid = CHEST_ID;
		stack = arg2;
			if (stack == 4){
			removeChange(cid, sid, stack)
			return
			}
			else
			applyChange(cid, sid, stack)
			return
		}
	// Reset All
	else if (arg1 == 'reset'){
		removeChange(cid, CHEST_ID, 4)
		removeChange(cid, GROW_ID, 4)
		removeChange(cid, THIGH_ID, 4)
		reapstate = false;
		removeChange(cid, REAP_ID, 1)
		ragstate = false;
		removeChange(cid, INTI_ID, 1)
		intistate = false;
		removeChange(cid, RAG_ID, 1)
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
		noctstate = false;
		removeChange(cid, NOCT_ID, 1)
		message(` All Effects have been removed!`)		
   }
	return false
	})

 function applyChange (cid, sid, stack){
	dispatch.toClient('S_ABNORMALITY_END', 1, {
				target: cid,
				id: sid,
			});	
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
				duration: 864000000,			  //This makes sure u can restore your appearance and no abnormality icon is left in your buff bar.
				unk: 0,
				stacks: stack,
				unk2: 0,
			});
	dispatch.toClient('S_ABNORMALITY_END', 1, {
				target: cid,
				id: sid,
			});	
	}
 function message(msg) {
    command.message('[Shape-changer] ' + msg);
	}
}