import {App} from "../main";


export const UserFactory = {
    construct(public http: Http){

    },

    getAll :function(){
        return this.http.get('/api/v1/users');
    },

    get:function(id){
        return App.http('/api/v1/users/'+id);
    },

    save: function(user){
        return App.http.post('/api/v1/users/subscribe', user);
    },

    update: function(user){
        return App.put('/api/v1/users/'+user._id, user);
    },

    delete: function(id){
        return App.delete('/api/v1/users/'+id);
    }

};