function MSTimer() {

    this.time = -1;

    /**
     * @param {Number} MS
     * @returns {Boolean} 
     */
    this.hasTimePassed = function(MS) {
        return new Date().getTime() >= this.time + MS;
    }

    /**
     * @param {Number} MS
     * @returns {Number}
     */
    this.hasTimeLeft = function(MS) {
        return (MS + this.time) - new Date().getTime();
    }

    this.reset = function() {
        this.time = new Date().getTime();
    }
}