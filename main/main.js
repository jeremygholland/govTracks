if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefaultPersistent('district', '');
    Session.setDefaultPersistent('firstName', '')
    Session.setDefaultPersistent('lastName', '');
    Session.setDefaultPersistent('state', '')
    Session.setDefaultPersistent('party', '');
    Session.setDefaultPersistent('firstTime', true);
    Session.setDefaultPersistent('backParty', '');

    Template.main.helpers({
        entityType: function() {
            return Session.get('entityType');
        },
        totalMoney: function() {
            return Session.get('totalMoney');
        },
        district: function() {
            return Session.get('district');
        },
        firstName: function() {
            return Session.get('firstName');
        },
        lastName: function() {
            return Session.get('lastName');
        },
        state: function() {
            return Session.get('state');
        },
        firstTime: function() {
            return Session.get('firstTime')
        },
        party: function() {
            Session.get('party');
        },
        searchedFor: function() {
            return Session.get('someStuff');
        },
        results: function() {
            return Session.get('resultsStuff');
        },
        party: function() {
            return Session.get('party');
        },
        firsties: function() {
            return Session.get('firsties');
        },
        lasties: function() {
            return Session.get('lasties');
        },
        backParty: function(){
          return Session.get('backParty');
        }

    });

    Template.main.onRendered(function(){
         $(document).ready(function() {
        $('#billTarget').html('');
        $('.slider').slider({
            interval: 2000,
            height: 100,
            indicators: false
        });
        var billArr = Session.get('billArr');
        var shortTitle = Session.get('shortTitle');
        for(i = 0; i <shortTitle.length; i ++){
        $('#billTarget').append('<li><a href="'+billArr[i]+'"> '+shortTitle[i]+'</a></li>');
        }
    });
    })
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}