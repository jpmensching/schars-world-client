angular.module('ScharsWorld').service('StorageService', function() {
    return {
        get: function(key) {
            if (typeof sessionStorage === 'undefined') {
                return null;
            } else {
                return sessionStorage.getItem(key);
            }
        },
        set: function(key, value) {
            if (typeof sessionStorage === 'undefined') {
                return;
            } else {
                sessionStorage.setItem(key, value);
            }
        }
    }
})
