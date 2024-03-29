
angular.module('ngCordova', [
  'ngCordova.plugins'
]);
// NOTE: shareViaEmail -> if user cancels sharing email, success is still called
// NOTE: shareViaEmail -> TO, CC, BCC must be an array, Files can be either null, string or array
// TODO: add support for iPad
// TODO: detailed docs for each social sharing types (each social platform has different requirements)

angular.module('ngCordova.plugins.socialSharing', [])

  .factory('$cordovaSocialSharing', ['$q', function ($q) {

    return {
      share: function (message, subject, file, link) {
        var q = $q.defer();
        window.plugins.socialsharing.share(message, subject, file, link,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      shareViaTwitter: function (message, file, link) {
        var q = $q.defer();
        window.plugins.socialsharing.shareViaTwitter(message, file, link,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      shareViaWhatsApp: function (message, file, link) {
        var q = $q.defer();
        window.plugins.socialsharing.shareViaWhatsApp(message, file, link,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      shareViaFacebook: function (message, file, link) {
        var q = $q.defer();
        window.plugins.socialsharing.shareViaFacebook(message, file, link,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      shareViaSMS: function (message, commaSeparatedPhoneNumbers) {
        var q = $q.defer();
        window.plugins.socialsharing.shareViaSMS(message, commaSeparatedPhoneNumbers,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      shareViaEmail: function (message, subject, toArr, ccArr, bccArr, fileArr) {
        var q = $q.defer();
        window.plugins.socialsharing.shareViaEmail(message, subject, toArr, ccArr, bccArr, fileArr,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      canShareViaEmail: function () {
        var q = $q.defer();
        window.plugins.socialsharing.canShareViaEmail(
            function () {
              q.resolve(true); // success
            },
            function () {
              q.reject(false); // error
            });
        return q.promise;
      },

      canShareVia: function (via, message, subject, file, link) {
        var q = $q.defer();
        window.plugins.socialsharing.canShareVia(via, message, subject, file, link,
          function (success) {
            q.resolve(success); // success
          },
          function (error) {
            q.reject(error); // error
          });
        return q.promise;
      },

      shareVia: function (via, message, subject, file, link) {
        var q = $q.defer();
        window.plugins.socialsharing.shareVia(via, message, subject, file, link,
            function () {
              q.resolve(true); // success
            },
            function () {
              q.reject(false); // error
            });
        return q.promise;
      }

    }
  }]);
angular.module('ngCordova.plugins.spinnerDialog', [])

.factory('$cordovaSpinnerDialog', [function() {

  return {
    show: function(title, message) {
	    return window.plugins.spinnerDialog.show(title, message);
    },
    hide: function() {
	    return window.plugins.spinnerDialog.hide();
    }
  }
  
}]);angular.module('ngCordova.plugins.sqlite', [])

  .factory('$cordovaSQLite', ['$q', function ($q) {

    return  {
      openDB: function (dbName) {
        return  window.sqlitePlugin.openDatabase({name: dbName});
      },


      openDBBackground: function (dbName) {
        return window.sqlitePlugin.openDatabase({name: dbName, bgType: 1});
      },

      execute: function (db, query, binding) {
        var q = $q.defer();
        db.transaction(function (tx) {
          tx.executeSql(query, binding, function (tx, result) {
              q.resolve(result);
            },
            function (transaction, error) {
              q.reject(error);
            });
        });
        return q.promise;
      },

      nestedExecute: function (db, query1, query2, binding1, binding2) {
        var q = $q.defer();

        db.transaction(function (tx) {
            tx.executeSql(query1, binding1, function (tx, result) {
              q.resolve(result);
              tx.executeSql(query2, binding2, function (tx, res) {
                q.resolve(res);
              })
            })
          },
          function (transaction, error) {
            q.reject(error);
          });

        return q.promise;
      }

      // more methods here
    }
  }]);
angular.module('ngCordova.plugins.keyboard', [])

.factory('$cordovaKeyboard', [function () {

  return {
    hideAccessoryBar: function (bool) {
      return cordova.plugins.Keyboard.hideKeyboardAccessoryBar(bool);
    },

    close: function () {
      return cordova.plugins.Keyboard.close();
    },

    disableScroll: function (bool) {
      return cordova.plugins.Keyboard.disableScroll(bool);
    },

    isVisible: function () {
      return cordova.plugins.Keyboard.isVisible
    }

    //TODO: add support for native.keyboardshow + native.keyboardhide
  }
}]);
angular.module('ngCordova.plugins.capture', [])

.factory('$cordovaCapture', ['$q', function($q) {

  return {
    captureAudio: function(options) {
      var q = $q.defer();

      if(!navigator.device.capture) {
        q.resolve(null);
        return q.promise;
      }

      navigator.device.capture.captureAudio(function(audioData) {
          q.resolve(audioData);
        }, function(err) {
          q.reject(err);
        }, options);

      return q.promise;
    },
    captureImage: function(options) {
      var q = $q.defer();

      if(!navigator.device.capture) {
        q.resolve(null);
        return q.promise;
      }

      navigator.device.capture.captureImage(function(imageData) {
          q.resolve(imageData);
        }, function(err) {
          q.reject(err);
        }, options);

      return q.promise;
    },
    captureVideo: function(options) {
      var q = $q.defer();

      if(!navigator.device.capture) {
        q.resolve(null);
        return q.promise;
      }

      navigator.device.capture.captureVideo(function(videoData) {
          q.resolve(videoData);
        }, function(err) {
          q.reject(err);
        }, options);

      return q.promise;
    }
  }
}]);
// TODO: add functionality to define storage size in the getFilesystem() -> requestFileSystem() method
// TODO: add documentation for FileError types
// TODO: add abort() option to downloadFile and uploadFile methods.
// TODO: add support for downloadFile and uploadFile options. (or detailed documentation) -> for fileKey, fileName, mimeType, headers
// TODO: add support for onprogress property


angular.module('ngCordova.plugins.file', [])

//Filesystem (checkDir, createDir, checkFile, creatFile, removeFile, writeFile, readFile)
  .factory('$cordovaFile', ['$q', function ($q) {

    return {
      checkDir: function (dir) {
        var q = $q.defer();

        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getDirectory(dir, {create: false},
              //Dir exists
              function (entry) {
                q.resolve(entry);
              },
              //Dir doesn't exist
              function (error_code) {
                q.reject(error_code);
              }
            );
          }
        );

        return q.promise;
      },

      createDir: function (dir, replaceBOOL) {
        var q = $q.defer();

        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getDirectory(dir, {create: true, exclusive: replaceBOOL},
              //Dir exists or is created successfully
              function (entry) {
                q.resolve(entry);
              },
              //Dir doesn't exist and is not created
              function (error_code) {
                q.reject(error_code);
              }
            );
          }
        );
        return q.promise;
      },

      listDir: function (filePath) {
        var q = $q.defer();

        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getDirectory(filePath, {create: false}, function (parent) {
              var reader = parent.createReader();
              reader.readEntries(
                function (entries) {
                  q.resolve(entries);
                },
                function () {
                  q.reject('DIR_READ_ERROR : ' + filePath);
                }
              );
            }, function () {
              q.reject('DIR_NOT_FOUND : ' + filePath);
            });
          }
        );

        return q.promise;
      },

      checkFile: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function checkFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getFile(filePath, {create: false},
              // File exists
              function (file) {
                q.resolve(file);
              },
              // File doesn't exist
              function (error_code) {
                q.reject(error_code);
              }
            );
          }
        );

        return q.promise;
      },

      createFile: function (filePath, replaceBOOL) {
        // Backward compatibility for previous function createFile(filepath replaceBOOL)
        var q = $q.defer();

        if (arguments.length == 3) {
          filePath = '/' + filePath + '/' + arguments[1];
          replaceBOOL = arguments[2];
        }

        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getFile(filePath, {create: true, exclusive: replaceBOOL},
              function (success) {
                q.resolve(success);
              },
              function (err) {
                q.reject(err);
              });
          }
        );

        return q.promise;
      },

      removeFile: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function removeFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getFile(filePath, {create: false}, function (fileEntry) {
              fileEntry.remove(function () {
                q.resolve();
              });
            });
          }
        );

        return q.promise;
      },

      writeFile: function (filePath, data) {
        var q = $q.defer();

        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getFile(filePath, {create: true},
              function (fileEntry) {
                fileEntry.createWriter(
                  function (fileWriter) {
                    fileWriter.onwriteend = function (evt) {
                      q.resolve(evt);
                    };
                    fileWriter.write(data);
                  },
                  function (error) {
                    q.reject(error);
                  });
              }
            );
          }
        );

        return q.promise;
      },

      readFile: function (filePath) {  /// now deprecated in new ng-cordova version
        var q = $q.defer();
        console.log('readFile is now deprecated as of v0.1.4-alpha, use readAsText instead');

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFilesystem().then(
          function (filesystem) {

            filesystem.root.getFile(filePath, {create: false},
              // success
              function (fileEntry) {
                fileEntry.file(function (file) {
                  var reader = new FileReader();
                  reader.onloadend = function () {
                    q.resolve(this.result);
                  };

                  reader.readAsText(file);
                });
              },
              // error
              function (error) {
                q.reject(error);
              });
          }
        );

        return q.promise;
      },

      readAsText: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFilesystem().then(
          function (filesystem) {

            filesystem.root.getFile(filePath, {create: false},
              // success
              function (fileEntry) {
                fileEntry.file(function (file) {
                  var reader = new FileReader();
                  reader.onloadend = function () {
                    q.resolve(this.result);
                  };

                  reader.readAsText(file);
                });
              },
              // error
              function (error) {
                q.reject(error);
              });
          }
        );

        return q.promise;
      },


      readAsDataURL: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFilesystem().then(
          function (filesystem) {

            filesystem.root.getFile(filePath, {create: false},
              // success
              function (fileEntry) {
                fileEntry.file(function (file) {
                  var reader = new FileReader();
                  reader.onloadend = function () {
                    q.resolve(this.result);
                  };

                  reader.readAsDataURL(file);
                });
              },
              // error
              function (error) {
                q.reject(error);
              });
          }
        );

        return q.promise;
      },

      readAsBinaryString: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFilesystem().then(
          function (filesystem) {

            filesystem.root.getFile(filePath, {create: false},
              // success
              function (fileEntry) {
                fileEntry.file(function (file) {
                  var reader = new FileReader();
                  reader.onloadend = function () {
                    q.resolve(this.result);
                  };

                  reader.readAsBinaryString(file);
                });
              },
              // error
              function (error) {
                q.reject(error);
              });
          }
        );

        return q.promise;
      },

      readAsArrayBuffer: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFilesystem().then(
          function (filesystem) {

            filesystem.root.getFile(filePath, {create: false},
              // success
              function (fileEntry) {
                fileEntry.file(function (file) {
                  var reader = new FileReader();
                  reader.onloadend = function () {
                    q.resolve(this.result);
                  };

                  reader.readAsArrayBuffer(file);
                });
              },
              // error
              function (error) {
                q.reject(error);
              });
          }
        );

        return q.promise;
      },

      readFileMetadata: function (filePath) {
        var q = $q.defer();

        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getFile(filePath, {create: false},
              // success
              function (fileEntry) {
                fileEntry.file(function (file) {
                  q.resolve(file);
                });
              },
              // error
              function (error) {
                q.reject(error);
              });
          }
        );

        return q.promise;
      },

      readFileAbsolute: function () {
        var q = $q.defer();
        window.resolveLocalFileSystemURI(filePath,
          function (fileEntry) {
            fileEntry.file(function (file) {
              var reader = new FileReader();
              reader.onloadend = function () {
                q.resolve(this.result);
              };

              reader.readAsText(file);
            })
          },
          function (error) {
            q.reject(error);
          }
        );
      },

      readFileMetadataAbsolute: function (filePath) {
        var q = $q.defer();
        window.resolveLocalFileSystemURI(filePath,
          function (fileEntry) {
            fileEntry.file(function (file) {
              q.resolve(file);
            })
          },
          function (error) {
            q.reject(error);
          }
        );

        return q.promise;
      },

      downloadFile: function (source, filePath, trustAllHosts, options) {
        var q = $q.defer();
        var fileTransfer = new FileTransfer();
        var uri = encodeURI(source);

        fileTransfer.onprogress = function (progressEvent) {
          q.notify(progressEvent);
        };

        fileTransfer.download(
          uri,
          filePath,
          function (entry) {
            q.resolve(entry);
          },
          function (error) {
            q.reject(error);
          },
          trustAllHosts, options);

        return q.promise;
      },

      uploadFile: function (server, filePath, options) {
        var q = $q.defer();
        var fileTransfer = new FileTransfer();
        var uri = encodeURI(server);

        fileTransfer.onprogress = function (progressEvent) {
          q.notify(progressEvent);
        };

        fileTransfer.upload(
          filePath,
          uri,
          function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          },
          options);

        return q.promise
      }

    };

    function getFilesystem() {
      var q = $q.defer();

      window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024, function (filesystem) {
          q.resolve(filesystem);
        },
        function (err) {
          q.reject(err);
        });

      return q.promise;
    }
  }]);
angular.module('ngCordova.plugins.pinDialog', [])

.factory('$cordovaPinDialog', [function() {

  return {
    prompt: function(message, promptCallback, title, buttonLabels, defaultText) {
	    return window.plugins.pinDialog.prompt.apply(navigator.notification, arguments);
    }
  }
  
}]);angular.module('ngCordova.plugins.globalization', [])

.factory('$cordovaGlobalization', ['$q', function ($q) {

  return {
    getPreferredLanguage: function () {
      var q = $q.defer();

      navigator.globalization.getPreferredLanguage(function (result) {
          q.resolve(result);
        },
        function (err) {
          q.reject(err);
        });
      return q.promise;
    },

    getLocaleName: function () {
      var q = $q.defer();

      navigator.globalization.getLocaleName(function (result) {
          q.resolve(result);
        },
        function (err) {
          q.reject(err);
        });
      return q.promise;
    },

    getFirstDayOfWeek: function () {
      var q = $q.defer();

      navigator.globalization.getFirstDayOfWeek(function (result) {
          q.resolve(result);
        },
        function (err) {
          q.reject(err);
        });
      return q.promise;
    },

    // "date" parameter must be a JavaScript Date Object.
    dateToString: function(date, options) {
      var q = $q.defer();

      navigator.globalization.dateToString(
        date,
        function (result) {
          q.resolve(result);
        },
        function (err) {
          q.reject(err);
        },
        options);
      return q.promise;
    },

    stringToDate: function(dateString, options) {
      var q = $q.defer();

      navigator.globalization.stringToDate(
        dateString,
        function (result) {
          q.resolve(result);
        },
        function (err) {
          q.reject(err);
        },
        options);
      return q.promise;
    },

    getDatePattern: function(options) {
      var q = $q.defer();

      navigator.globalization.getDatePattern(
        function (result) {
          q.resolve(result);
        },
        function (err) {
          q.reject(err);
        },
        options);
      return q.promise;
    },

    getDateNames: function(options) {
      var q = $q.defer();

      navigator.globalization.getDateNames(
        function (result) {
          q.resolve(result);
        },
        function (err) {
          q.reject(err);
        },
        options);
      return q.promise;
    },

    // "date" parameter must be a JavaScript Date Object.
    isDayLightSavingsTime: function(date) {
      var q = $q.defer();

      navigator.globalization.isDayLightSavingsTime(
        date,
        function (result) {
          q.resolve(result);
        },
        function (err) {
          q.reject(err);
        });
      return q.promise;
    },

    numberToString: function(number, options) {
      var q = $q.defer();

      navigator.globalization.numberToString(
        number,
        function (result) {
          q.resolve(result);
        },
        function (err) {
          q.reject(err);
        },
        options);
      return q.promise;
    },

    stringToNumber: function(numberString, options) {
      var q = $q.defer();

      navigator.globalization.stringToNumber(
        numberString,
        function (result) {
          q.resolve(result);
        },
        function (err) {
          q.reject(err);
        },
        options);
      return q.promise;
    },

    getNumberPattern: function(options) {
      var q = $q.defer();

      navigator.globalization.getNumberPattern(
        function (result) {
          q.resolve(result);
        },
        function (err) {
          q.reject(err);
        },
        options);
      return q.promise;
    },

    getCurrencyPattern: function(currencyCode) {
      var q = $q.defer();

      navigator.globalization.getCurrencyPattern(
        currencyCode,
        function (result) {
          q.resolve(result);
        },
        function (err) {
          q.reject(err);
        });
      return q.promise;
    }

  }

}]);
angular.module('ngCordova.plugins.splashscreen', [])

.factory('$cordovaSplashscreen', [ function () {

  return {
    hide: function () {
      return navigator.splashscreen.hide();
    },

    show: function () {
      return navigator.splashscreen.show();
    }
  };

}]);
angular.module('ngCordova.plugins.geolocation', [])

.factory('$cordovaGeolocation', ['$q', function($q) {

  return {
    getCurrentPosition: function(options) {
      var q = $q.defer();

      navigator.geolocation.getCurrentPosition(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    },
    watchPosition: function(options) {
      var q = $q.defer();

      var watchId = navigator.geolocation.watchPosition(function(result) {
        // Do any magic you need
        q.notify(result);

      }, function(err) {
        q.reject(err);
      }, options);

      return {
        watchId: watchId,
        promise: q.promise
      }
    },

    clearWatch: function(watchID) {
      return navigator.geolocation.clearWatch(watchID);
    }
  }
}]);
angular.module('ngCordova.plugins.appAvailability', [])

.factory('$cordovaAppAvailability', ['$q', function ($q) {

  return {
    check: function(urlScheme) {
      var q = $q.defer();

      appAvailability.check(urlScheme, function (result) {
        q.resolve(result);
      }, function (err) {
        q.reject(err);
      });

      return q.promise;
    }
  }
}]);angular.module('ngCordova.plugins.push', [])

.factory('$cordovaPush', ['$q', function ($q) {
    return {
        register: function (config) {
            var q = $q.defer();
            window.plugins.pushNotification.register(
            function (result) {
                q.resolve(result);
            },
            function (error) {
                q.reject(error);
            },
            config);
            
            return q.promise;
        },
        
        unregister: function (options) {
            var q = $q.defer();
            window.plugins.pushNotification.unregister(
            function (result) {
                q.resolve(result);
            },
            function (error) {
                q.reject(error);
            },
            options);
            
            return q.promise;
        },
        
        // iOS only
        setBadgeNumber: function(number) {
        	var q = $q.defer();
            window.plugins.pushNotification.setApplicationIconBadgeNumber(
            function (result) {
                q.resolve(result);
            },
            function (error) {
                q.reject(error);
            },
            number);
            return q.promise;
        }
    };
}]);angular.module('ngCordova.plugins.ga', [])

  .factory('$cordovaGA', ['$q', function ($q) {

    return {

      init: function (id, mingap) {
        var q = $q.defer();
        mingap = (mingap >= 0) ? mingap : 10;
        window.plugins.gaPlugin.init(function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          },
          id, mingap);
        return q.promise;
      },

      trackEvent: function (success, fail, category, eventAction, eventLabel, eventValue) {
        var q = $q.defer();
        window.plugins.gaPlugin.trackEvent(function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          },
          category, eventAction, eventLabel, eventValue);
        return q.promise;
      },

      trackPage: function (success, fail, pageURL) {
        var q = $q.defer();
        window.plugins.gaPlugin.trackPage(function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          },
          pageURL);
        return q.promise;
      },

      setVariable: function (success, fail, index, value) {
        var q = $q.defer();
        window.plugins.gaPlugin.setVariable(function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          },
          index, value);
        return q.promise;
      },

      exit: function (success, fail) {
        var q = $q.defer();
        window.plugins.gaPlugin.exit(function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          });
        return q.promise;
      }
    };
  }]);angular.module('ngCordova.plugins.deviceMotion', [])

.factory('$cordovaDeviceMotion', ['$q', function($q) {

  return {
    getCurrentAcceleration: function() {
      var q = $q.defer();

      navigator.accelerometer.getCurrentAcceleration(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      });

      return q.promise;
    },
    watchAcceleration: function(options) {
      var q = $q.defer();

      var watchId = navigator.accelerometer.watchAcceleration(function(result) {
        // Do any magic you need
        //q.resolve(watchID);
        q.notify(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return {
        watchId: watchId,
        promise: q.promise
      }
    },
    clearWatch: function(watchID) {
      return navigator.accelerometer.clearWatch(watchID);
    }
  }
}]);
angular.module('ngCordova.plugins.flashlight', [])

.factory('$cordovaFlashlight', ['$q', function ($q) {

    return {
      available: function () {
        var q = $q.defer();
        window.plugins.flashlight.available(function (isAvailable) {
          q.resolve(isAvailable);
        });
        return q.promise;
      },

      switchOn: function () {
        var q = $q.defer();
        window.plugins.flashlight.switchOn(function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        });
        return q.promise;
      },

      switchOff: function () {
        var q = $q.defer();
        window.plugins.flashlight.switchOff(function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        });
        return q.promise;
      }
    }
  }
]);angular.module('ngCordova.plugins.toast', [])

.factory('$cordovaToast', ['$q', function ($q) {

    return {
      showShortTop: function (message) {
        var q = $q.defer();
        window.plugins.toast.showShortTop(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        })
        return q.promise;
      },

      showShortCenter: function (message) {
        var q = $q.defer();
        window.plugins.toast.showShortCenter(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        })
        return q.promise;
      },

      showShortBottom: function (message) {
        var q = $q.defer();
        window.plugins.toast.showShortBottom(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        })
        return q.promise;
      },

      showLongTop: function (message) {
        var q = $q.defer();
        window.plugins.toast.showLongTop(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        })
        return q.promise;
      },

      showLongCenter: function (message) {
        var q = $q.defer();
        window.plugins.toast.showLongCenter(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        })
        return q.promise;
      },

      showLongBottom: function (message) {
        var q = $q.defer();
        window.plugins.toast.showLongBottom(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        })
        return q.promise;
      },


      show: function (message, duration, position) {
        var q = $q.defer();
        window.plugins.toast.show(message, duration, position, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error)
        })
        return q.promise;
      }
    }

  }
]);angular.module('ngCordova.plugins.sms', [])

.factory('$cordovaSms', ['$q', function ($q) {

    return {
      send: function (number, message, intent) {
        var q = $q.defer();
        sms.send(number, message, intent, function (res) {
          q.resolve(res);
        }, function (err) {
          q.reject(err)
        })
        return q.promise;
      }
    }

}]);angular.module('ngCordova.plugins.localNotification', [])

.factory('$cordovaLocalNotification', ['$q',
    function ($q) {

        return {
            add: function (options, scope) {
                var q = $q.defer();
                window.plugin.notification.local.add(
                    options,
                    function (result) {
                        q.resolve(result);
                    },
                    scope);
                return q.promise;
            },

            cancel: function (id, scope) {
                var q = $q.defer();
                window.plugin.notification.local.cancel(
                    id, function (result) {
                        q.resolve(result);
                    }, scope);

                return q.promise;
            },

            cancelAll: function (scope) {
                var q = $q.defer();

                window.plugin.notification.local.cancelAll(
                    function (result) {
                        q.resolve(result);
                    }, scope);

                return q.promise;
            },

            isScheduled: function (id, scope) {
                var q = $q.defer();

                window.plugin.notification.local.isScheduled(
                    id,
                    function (result) {
                        q.resolve(result);
                    }, scope);

                return q.promise;
            },

            getScheduledIds: function (scope) {
                var q = $q.defer();

                window.plugin.notification.local.getScheduledIds(
                    function (result) {
                        q.resolve(result);
                    }, scope);

                return q.promise;
            },

            isTriggered: function (id, scope) {
                var q = $q.defer();

                window.plugin.notification.local.isTriggered(
                    id, function (result) {
                        q.resolve(result);
                    }, scope);

                return q.promise;
            },

            getTriggeredIds: function (scope) {
                var q = $q.defer();

                window.plugin.notification.local.getTriggeredIds(
                    function (result) {
                        q.resolve(result);
                    }, scope);

                return q.promise;
            },

            getDefaults: function () {
                return window.plugin.notification.local.getDefaults();
            },

            setDefaults: function (Object) {
                window.plugin.notification.local.setDefaults(Object);
            },

            onadd: function () {
                return window.plugin.notification.local.onadd;
            },

            ontrigger: function () {
                return window.plugin.notification.local.ontrigger;
            },

            onclick: function () {
                return window.plugin.notification.local.onclick;
            },

            oncancel: function () {
                return window.plugin.notification.local.oncancel;
            }
        }
    }
]);angular.module('ngCordova.plugins.contacts', [])

.factory('$cordovaContacts', ['$q', function ($q) {

  return {
    save: function (contact) {
      var q = $q.defer();
      var deviceContact = navigator.contacts.create(contact);

      deviceContact.save(function (result) {
          q.resolve(result);
        },
        function (err) {
          q.reject(err);
        });
      return q.promise;
    },

    remove: function (contact) {
      var q = $q.defer();
      var deviceContact = navigator.contacts.create(contact);

      deviceContact.remove(function (result) {
          q.resolve(result);
        },
        function (err) {
          q.reject(err);
        });
      return q.promise;
    },

    clone: function (contact) {
      var deviceContact = navigator.contacts.create(contact);
      return deviceContact.clone(contact)
    },

    find: function (options) {
      var q = $q.defer();
      var fields = options.fields || ['id', 'displayName'];
      delete options.fields;

      navigator.contacts.find(fields, function (results) {
          q.resolve(results);
        },
        function (err) {
          q.reject(err);
        },
        options);

      return q.promise;
    }

    /*
     getContact: function (contact) {
     var q = $q.defer();

     navigator.contacts.pickContact(function (contact) {

     })

     }
     */

    // TODO: method to set / get ContactAddress
    // TODO: method to set / get ContactError
    // TODO: method to set / get ContactField
    // TODO: method to set / get ContactName
    // TODO: method to set / get ContactOrganization

  }

}]);
angular.module('ngCordova.plugins.deviceOrientation', [])

.factory('$cordovaDeviceOrientation', ['$q', function($q) {

  return {
    getCurrentHeading: function() {
      var q = $q.defer();

      navigator.compass.getCurrentHeading(function(heading) {
        q.resolve(heading);
      }, function(err) {
        q.reject(err);
      });

      return q.promise;
    },
    watchHeading: function(options) {
      var q = $q.defer();

      var watchId = navigator.compass.watchHeading(function(result) {
        q.notify(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return {
        watchId: watchId,
        promise: q.promise
      }
    },
    clearWatch: function(watchID) {
      navigator.compass.clearWatch(watchID);
    }
  }
}]);
angular.module('ngCordova.plugins.barcodeScanner', [])

.factory('$cordovaBarcodeScanner', ['$q', function ($q) {

  return {
    scan: function (options) {
      var q = $q.defer();

      cordova.plugins.barcodeScanner.scan(function (result) {
        q.resolve(result);
      }, function (err) {
        q.reject(err);
      });

      return q.promise;
    },

    encode: function (type, data) {
      var q = $q.defer();

      /* TODO needs work for type:
       make the default:  BarcodeScanner.Encode.TEXT_TYPE
       other options: .EMAIL_TYPE, .PHONE_TYPE, .SMS_TYPE

       docs: https://github.com/wildabeast/BarcodeScanner#encoding-a-barcode
       */

      cordova.plugins.barcodeScanner.encode(type, data, function (result) {
        q.resolve(result);
      }, function (err) {
        q.reject(err);
      });

      return q.promise;
    }
  }
}]);
angular.module('ngCordova.plugins.network', [])

.factory('$cordovaNetwork', [function () {

  return {

    getNetwork: function () {
      return navigator.connection.type;
    },

    isOnline: function () {
      var networkState = navigator.connection.type;
      return networkState !== Connection.UNKNOWN && networkState !== Connection.NONE;
    },

    isOffline: function () {
      var networkState = navigator.connection.type;
      return networkState === Connection.UNKNOWN || networkState === Connection.NONE;
    }
  }
}]);
angular.module('ngCordova.plugins.statusbar', [])

.factory('$cordovaStatusbar', [function() {

  return {
  	overlaysWebView: function(bool) {
      return StatusBar.overlaysWebView(true);
	  },

    // styles: Default, LightContent, BlackTranslucent, BlackOpaque
    style: function (style) {
      switch (style) {
        case 0:     // Default
          return StatusBar.styleDefault();
          break;

        case 1:     // LightContent
          return StatusBar.styleLightContent();
          break;

        case 2:     // BlackTranslucent
          return StatusBar.styleBlackTranslucent();
          break;

        case 3:     // BlackOpaque
          return StatusBar.styleBlackOpaque();
          break;

        default:  // Default
          return StatusBar.styleDefault();
      }
    },


    // supported names: black, darkGray, lightGray, white, gray, red, green, blue, cyan, yellow, magenta, orange, purple, brown
    styleColor: function (color) {
      return StatusBar.backgroundColorByName(color);
    },
    
    styleHex: function (colorHex) {
      return StatusBar.backgroundColorByHexString(colorHex);
    },

    hide: function () {
      return StatusBar.hide();
    },

    show: function () {
      return StatusBar.show()
    },

    isVisible: function () {
      return StatusBar.isVisible();
    }
  }
}]);
angular.module('ngCordova.plugins.dialogs', [])

.factory('$cordovaDialogs', [function() {

  return {
    alert: function(message, callback, title, buttonName) {
	    return navigator.notification.alert.apply(navigator.notification, arguments);
    },

    confirm: function(message, callback, title, buttonName) {
	    return navigator.notification.confirm.apply(navigator.notification, arguments);
    },

    prompt: function(message, promptCallback, title, buttonLabels, defaultText) {
	    return navigator.notification.prompt.apply(navigator.notification, arguments);
    },

    beep: function(times) {
	    return navigator.notification.beep(times);
    }
  }
}]);
angular.module('ngCordova.plugins.device', [])

.factory('$cordovaDevice', [function () {

  return {
    getDevice: function () {
      return device;
    },

    getCordova: function () {
      return device.cordova;
    },

    getModel: function () {
      return device.model;
    },

    // Waraning: device.name is deprecated as of version 2.3.0. Use device.model instead.
    getName: function () {
      return device.name;
    },

    getPlatform: function () {
      return device.platform;
    },

    getUUID: function () {
      return device.uuid;
    },

    getVersion: function () {
      return device.version;
    }
  }
}]);
angular.module('ngCordova.plugins', [
  'ngCordova.plugins.deviceMotion',
  'ngCordova.plugins.camera',
  'ngCordova.plugins.geolocation',
  'ngCordova.plugins.deviceOrientation',
  'ngCordova.plugins.dialogs',
  'ngCordova.plugins.vibration',
  'ngCordova.plugins.network',
  'ngCordova.plugins.device',
  'ngCordova.plugins.barcodeScanner',
  'ngCordova.plugins.splashscreen',
  'ngCordova.plugins.keyboard',
  'ngCordova.plugins.contacts',
  'ngCordova.plugins.statusbar',
  'ngCordova.plugins.file',
  'ngCordova.plugins.socialSharing',
  'ngCordova.plugins.globalization',
  'ngCordova.plugins.sqlite',
  'ngCordova.plugins.ga',
  'ngCordova.plugins.push',
  'ngCordova.plugins.spinnerDialog',
  'ngCordova.plugins.sms',
  'ngCordova.plugins.pinDialog',
  'ngCordova.plugins.localNotification',
  'ngCordova.plugins.toast',
  'ngCordova.plugins.flashlight',
  'ngCordova.plugins.capture',
  'ngCordova.plugins.appAvailability',
  'ngCordova.plugins.prefs',
  'ngCordova.plugins.printer',
  'ngCordova.plugins.bluetoothSerial',
  'ngCordova.plugins.backgroundGeolocation',
  'ngCordova.plugins.facebookConnect',
  'ngCordova.plugins.adMob',
  'ngCordova.plugins.googleMap',
  'ngCordova.plugins.clipboard',
  'ngCordova.plugins.nativeAudio',
  'ngCordova.plugins.media'
]);
angular.module('ngCordova.plugins.bluetoothSerial', [])

.factory('$cordovaBluetoothSerial', ['$q' , function ($q) {

  var promise_f = function() {
    var q = $q.defer();

    // callbacks
    var success =  function (success) {
      q.resolve(success);
    };
    var failure = function (failure) {
      q.reject(failure);
    };

    // get func and set args
    var f_name = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1, arguments.length);
    args.push(success);
    args.push(failure);

    window.bluetoothSerial[f_name].apply(this, args);

    return q.promise;
  };

  return {
    connect:          function (macAddress) { return promise_f('connect', macAddress); },
    connectInsecure:  function (macAddress) { return promise_f('connectInsecure', macAddress); },
    disconnect:       function () { return promise_f('disconnect'); },
    list:             function () { return promise_f('list'); },
    isEnabled:        function () { return promise_f('isEnabled'); },
    isConnected:      function () { return promise_f('isConnected'); },
    available:        function () { return promise_f('available'); },
    read:             function () { return promise_f('read'); },
    readUntil:        function (delimiter) { return promise_f('readUntil', delimiter); },
    write:            function (data) { return promise_f('write', data); },
    subscribe:        function (delimiter) { return promise_f('subscribe', delimiter); },
    unsubscribe:      function () { return promise_f('unsubscribe'); },
    clear:            function () { return promise_f('clear'); },
    readRSSI:         function () { return promise_f('readRSSI'); }
  };
}]);
angular.module('ngCordova.plugins.vibration', [])

.factory('$cordovaVibration', [function() {

  return {
  	vibrate: function(times) {
  	  return navigator.notification.vibrate(times);
	  },
    vibrateWithPattern: function(pattern, repeat) {
      return navigator.notification.vibrateWithPattern(pattern, repeat);
    },
    cancelVibration: function() {
      return navigator.notification.cancelVibration();
    }
  }
}]);
angular.module('ngCordova.plugins.camera', [])

.factory('$cordovaCamera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      if(!navigator.camera) {
        q.resolve(null);
        return q.promise;
      }

      navigator.camera.getPicture(function(imageData) {
        q.resolve(imageData);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    },
    cleanup: function(options) {
      var q = $q.defer();

      navigator.camera.cleanup(function() {
        q.resolve(arguments);
      }, function(err) {
        q.reject(err);
      });

      return q.promise;
    }
    
  }
}]);
