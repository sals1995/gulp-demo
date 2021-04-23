class Person {
    constructor(fname, lname) {
       this.fname = fname;
       this.lname = lname;
    }
 
    get fullname() {
       return this.fname +"-"+this.lname;
    }
 }
 console.log(new Person("sals","hussien"));
