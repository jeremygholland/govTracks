
if (Meteor.isClient) {
  // counter starts at 0
  Template.individual.helpers({
    contribNames: function(){
      return Session.get('contribNames');
    },
  });


  }

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
