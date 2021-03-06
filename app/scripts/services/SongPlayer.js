(function() {
    function SongPlayer($rootScope, Fixtures, Metrics) {
        var SongPlayer = {};
        var currentAlbum = Fixtures.getAlbum();
        //var currentSong = null;

        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        SongPlayer.currentSong = null;
 /**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
        SongPlayer.currentTime = null;
 /**
 *      @desc Buzz object audio file
 *      @type {Object}
 */
        var currentBuzzObject = null;


 /**
 *      @function setSong
 *      @desc Stops currently playing song and loads new audio file as currentBuzzObject
 *      @param {Object} song
 */
        var setSong = function(song) {         

           if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            
            Metrics.registerSongPlay(song);

            SongPlayer.currentSong = song;
        };
 /**
 *      @function playSong
 *      @desc Activates buzz object to play song, set song playing to true
 *      @param {Object} song
 */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        }

        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if(SongPlayer.currentSong !== song) {
                setSong(song);

                playSong(song);

            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
            
        };

        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex > currentAlbum.songs.length - 1) {
                var song = currentAlbum.songs[0];
                setSong(song);
                playSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            } 
        };

        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        SongPlayer.volume = null;

        SongPlayer.setVolume = function(value) {
            if(currentBuzzObject) {
                currentBuzzObject.setVolume(value);
            }
        };

        return SongPlayer;
    }

    angular 
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope','Fixtures', 'Metrics', SongPlayer]);
})();