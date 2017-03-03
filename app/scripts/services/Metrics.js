(function () {
    function Metrics($rootScope) {
        $rootScope.songPlays = [];
        var songs = [];


        return  {
            registerSongPlay: function (songObj) {
                songObj['playedAt'] = new Date();
                $rootScope.songPlays.push(songObj);

                console.log(songObj);

            },
            listSongPlayed: function() {
                //var songs = [];
                angular.forEach($rootScope.songPlays, function(song) {
                    songs.push(song.title);
                });
                console.log(songs);
                return songs;
            },
            countSongs: function() {
               var counts = {};   
               var songName = [];
                for (var i = 0; i < $rootScope.songPlays.length; i++) {
                    songName.push($rootScope.songPlays[i].title);
                }

                for (var i = 0; i < songName.length; i++) {
                    counts[songName[i]] = 1 + (counts[songName[i]] || 0);
                }

                console.log(counts);
                console.log(songName);

            
                return counts;
            }
        };
    }

    angular
        .module('blocJams')
        .service('Metrics', ['$rootScope', Metrics]);
})();