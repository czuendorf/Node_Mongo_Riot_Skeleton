let model = {
    "user": null,
    "appname": "Your App Name",
    "fetchUserData" : function() {
        let self = this;
        if (this.user) {
            self.trigger("update_user", this.user);
            return;
        }
        fetch('/userdata', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/JSON; charset=utf-8'
            },
            credentials: 'include'
        }).then(function (response) {
            response.json().then(function (json) {
                self.user = json.user;
                self.trigger("update_user", json.user);
            });
        });
    }
};