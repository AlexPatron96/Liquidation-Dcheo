const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export default getConfig;

// const getConfig = () => ({
   
//     "Authorization": `Bearer ${localStorage.getItem("token")}` ,
//     "Content-Type": 'application/json'

// });

// export default getConfig;