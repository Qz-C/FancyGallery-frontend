export default {
    setCookie( name, value, daysToExpire=1 ){
        let date = new Date();
        //Current date + plus the time required gives the expires date
        date.setTime(date.getTime()+(daysToExpire*24*60*60*1000))
        document.cookie = `${name} = ${value}; expires = ${date.toUTCString()}; path=/`
    },

    getCookie(cookieName){
        const remove = `${cookieName}=`

        //Avoid errors with special chars
        const cookie = decodeURIComponent(document.cookie);
        if(cookie !== "")
            return cookie.substring(remove.length, cookie.length);
        return cookie;
    },
}