module.exports = {
    checkForm: function (req) {
        this.objectStatus.errors = [];
        this.objectStatus.status = true;
        const regFirstName = /^[а-яА-ЯёЁa-zA-Z]+$/;
        const regLastName = /^[а-яА-ЯёЁa-zA-Z]+$/;
        const regAge = /(^[1-9][0-9]?$)|(^100$)/;
        const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const firstName = req.body.firstName.match(regFirstName);
        const lastName = req.body.lastName.match(regLastName);
        const age = req.body.age.toString().match(regAge);
        const email = req.body.email.match(regEmail);
        if (!firstName) {
            this.objectStatus.errors.push({
                field: 'firstName',
                message: 'Invalid first name',
            });
            this.objectStatus.status = false;
        }
        if (!lastName) {
            this.objectStatus.errors.push({
                field: 'lastName',
                message: 'Invalid last name',
            });
            this.objectStatus.status = false;
        }
        if (!age) {
            this.objectStatus.errors.push({
                field: 'age',
                message: 'Invalid age',
            });
            this.objectStatus.status = false;
        }
        if (!email) {
            this.objectStatus.errors.push({
                field: 'email',
                message: 'Invalid email',
            });
            this.objectStatus.status = false;
        }
        console.log(this.objectStatus);
        return this.objectStatus;
    },
    checkSignIn: function (req) {
        this.objectStatus.errors = [];
        this.objectStatus.status = true;
        const rexLogin = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
        const rexPassword = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        const matchLogin = req.body.login.match(rexLogin);
        const matchPassword = req.body.password.match(rexPassword);
        const errorPassword = '<br>*only english letters<br>*al least 8 symbols<br>*One of letters have to be UpperCase<br>*One of letters have to be LowerCase <br>*One of symbols have to be a number';
        if (!matchLogin) {
            this.objectStatus.errors.push({
                field: 'login',
                message: '<b>Invalid login.</b><br> You have to enter al least 4 symbols<br>',
            });
            this.objectStatus.status = false;
        }
        if (!matchPassword) {
            this.objectStatus.errors.push({
                field: 'password',
                message: '<b>Invalid password.</b><br> You have to enter: ' + errorPassword,
            });
            this.objectStatus.status = false;
        }
        console.log(this.objectStatus);
        return this.objectStatus;
    },
    checkEmpty: function (req) {
        this.objectStatus.errors = [];
        this.objectStatus.status = true;
        return this.objectStatus;
    },
    objectStatus: {
        errors: [],
        status: true,
    },
};
