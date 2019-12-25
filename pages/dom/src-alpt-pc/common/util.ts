const type = ( tag: any ): string => Object.prototype.toString.call( tag ).replace( /.*\s|[^\w]/g, '' ).toLowerCase();

const bindEvent = ( target: any, eventType: string, handle: ( ( e: Event ) => void ), flag: boolean = false ) => {
  if ( !target ) {
    throw new Error( '目标节点不存在' );
  }
  if ( target.addEventListener ) {
    target.addEventListener( eventType, handle, flag );
  } else if ( target.attachEvent ) {
    target.attachEvent( `on${eventType}`, handle, flag );
  } else {
    target[`on${eventType}`] = handle;
  }
};

const unBindEvent = ( target: any, eventType: string, handle: ( ( e: Event ) => void ) ) => {
  if ( !target ) {
    throw new Error( '目标节点不存在' );
  } else if ( target.addEventListener ) {
    target.removeEventListener( eventType, handle );
  } else if ( target.attachEvent ) {
    target.detachEvent( `on${eventType}`, handle );
  }
};
// 中英文切换
const locale = ( local?: string ): string => {
  const key = 'alpt_language';
  if ( local ) {
    localStorage.setItem( key, local );
  } else {
    local = localStorage.getItem( key ) || 'cn';
  }
  return local;
};

export default {
  bindEvent,
  unBindEvent,
  type,
  locale,
};

