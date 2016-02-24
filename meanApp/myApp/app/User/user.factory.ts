import {$http} from '../lib/xhr.factory'

export const UserFactory = {

    getAll :function(){
        return $http.get('/api/v1/users');
    },

    get:function(id){
        return $http.get('/api/v1/user/'+id);
    },

    save: function(user){
        return $http.post('/api/v1/user', user);
    },

    update: function(user){
        return $http.put('/api/v1/user/'+user._id, user);
    },

    delete: function(id){
        return $http.delete('/api/v1/user/'+id);
    }

};