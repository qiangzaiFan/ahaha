function getRandom(min,max){
  return Math.floor( Math.random() * (max - min + 1) + min)
}

export function shuffle(arr){
  let _arr = arr.slice()  //弄一个副本，不会对arr原来数组产生影响
  for(let i = 0; i<_arr.length;i++){
    let j = getRandom(0,i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
