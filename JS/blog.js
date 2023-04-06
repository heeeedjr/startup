class Comment {
    constructor(name, comment, date, id) {
        this.name = name;
        this.comment = comment;
        this.date = date;
        this.id = id;
    }

    prettyDate() 
    {
        let regex = /([0-9]{4})-([0-9]{2})-([0-9]{2})/
        let matches = regex.exec(this.date)

        let year = matches[1]
        let month = matches[2]
        let day = matches[3]

        return `${month}/${day}/${year}`
    }
}

function getDate()
{
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth()+1 //January is 0!
    let yyyy = today.getFullYear()
    
    if (dd < 10) { dd = '0' + dd } 
    if (mm < 10) { mm = '0' + mm } 
    
    let theDate = yyyy + '-' + mm + '-' + dd
    return theDate;
}

window.addEventListener('load', getDate)