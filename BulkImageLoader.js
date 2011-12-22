(function(window){
  
  var BulkImageLoader = function(loaderName, onloadFunc){
    this.initialize(loaderName, onloadFunc);
  }
  
  var p = BulkImageLoader.prototype;
  p.fileList = null;
  p.files = null;
  p.isDebug = false;
  p.loadEvent = null;
  p.fileTotal = 0;
  p.loadCount = 0;
  p.onloadFunction = {};
  
  p.initialize = function(loaderName, onloadFunc){
    this.name = loaderName;
    p.onloadFunction = onloadFunc;
    p.log(this.events);
  }
  
  p.setOnLoad = function(func) {
    p.onload = func;
  }
  
  p.getImage = function(fileName){
    if(p.checkForExistingKey(fileName)){
      return p.files[fileName]
    }
  }
  
  p.debug = function(boolValue){
    p.isDebug = boolValue;
  }
  
  p.addFileToLoad = function(fileName, filePath, fileType){
    if(p.fileList == null) p.fileList = new Array();
    if(!p.checkForExistingKey(fileName)){
      p.fileList[fileName] = {type: fileType, path: filePath};
      p.fileTotal += 1;
    }
  }
  
  p.checkForExistingKey = function(fileName){
    if(p.fileList != null){
      for(key in p.fileList){
        if(key == fileName) return true;
      }
    }
    return false;
  }
  
  p.load = function(){
    p.loadCount = 0;
    if(p.fileList != null){
      p.files = new Array();
      for(key in p.fileList){
        var toLoad = p.fileList[key];
        var img = new Image();
        img.name = key;
        img.onload = p.onImageLoad;
        img.src = toLoad.path;
        p.files[key] = img;
        p.log('loading: '+ key);
      }
    }
  }
  
  p.onImageLoad = function(){
    p.loadCount += 1;
    if(p.loadCount == p.fileTotal){
      p.dispatchFinished();
    }
  }
  
  p.dispatchFinished = function(){
    if(typeof p.onloadFunction == 'function') p.onloadFunction();
  }
  
  p.log = function(info){
    if(p.isDebug){
      if("console" in window && typeof console == "object"){
        console.log(info);
      }
    }
  }
  
  
  window.BulkImageLoader = BulkImageLoader;
  
}(window));