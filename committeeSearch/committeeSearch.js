
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

  Template.committeeSearch.rendered= function(){
    var billArr = Session.get('billArr');
        var shortTitle = Session.get('shortTitle');
        for(i = 0; i <shortTitle.length; i ++){
        $('#billTarget').append('<li><a href="'+billArr[i]+'"> '+shortTitle[i]+'</a></li>');
        }
      }

  }

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
