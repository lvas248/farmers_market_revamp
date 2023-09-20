function formatDate(string){
    const date = new Date(string)
    const options = { month: "short", day: "numeric", year: "numeric" }
    return date.toLocaleString("en-US", options)
}

export default formatDate;