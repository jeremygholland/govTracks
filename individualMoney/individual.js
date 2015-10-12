
if (Meteor.isClient) {
  // counter starts at 0
  Template.individual.helpers({
    contribNames: function(){
      return Session.get('contribNames');
    },
  });

    Template.individual.onRendered(function(){
       $('.secondSlider').slider({
            interval: 3000,
            height: 100,
            indicators: false,
        });
    });

  }

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
