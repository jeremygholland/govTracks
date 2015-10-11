
if (Meteor.isClient) {
  Session.setDefaultPersistent('congressWoman', false);
  // counter starts at 0
  Template.committeeSlides.helpers({
    billStuff: function(){
      return Session.get('billStuff');
    },
    shortTitle: function(){
    return  Session.get('shortTitle');
    },
    committees: function(){
      return Session.get('committees');
    },
    gender: function(){
      return Session.get('gender')
    }
  });

  Template.body.helpers({

  });

  Template.committeeSlides.onRendered(function(){
    $(document).ready(function() {
        $('.slider').slider({
            interval: 2000,
            height: 100,
            indicators: false
        });
    });

})
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
