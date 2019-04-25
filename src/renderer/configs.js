var configs = {};

configs.get = (key)=>{
    return configs[key]
}

configs.set = (key,v)=>{
    configs[key] = v
}


// configs.set('s','w')
export default {
   configs: configs,
   set: configs.set,
   get: configs.get
}