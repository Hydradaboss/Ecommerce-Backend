export const stripBody = ( body ) => {
    const { firstName, lastName, password, mobile, email} = body 
    const isValidFirstName = typeof firstName  === "string" && name.trim() !== "";
    const isValidLastname = typeof lastName === "string" && username.trim() !== "";
    const isValidpassword = typeof password === "string" && username.trim() !== "";
    const isValidEmail = typeof email === "string" && username.trim() !== "";
    const isValidMobile = typeof lastName === "int" && username.trim() !== "";

    if(!isValidEmail || !isValidFirstName || !isValidLastname || !isValidpassword || !isValidMobile){
        throw new Error("A field is empty")
    }
    
    return { firstName, lastName, password, mobile, email }; 
}