
if (Meteor.isClient) {
  // counter starts at 0
  Template.committeeSearch.helpers({
    billStuff: function(){
      return Session.get('billArr');
    },
    shortTitle: function(){
    return  Session.get('shortTitle');
    },
    committees: function(){
      return Session.get('committees');
    }
  });


  }

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
