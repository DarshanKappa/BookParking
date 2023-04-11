


export function apiView(ClassAPI){

    const api_fun =  (...param)=>{
        const req = param[0];
        console.log(`Request method: ${req.method}`)
        
        const api = new ClassAPI()
        
        if(req.method === "GET"){
            if(!api.get){
                return param[1].status(405).json("Wrong HTTP method")
            }
            
            const res = api.get(...param)
            return res
            
        }else if(req.method === "POST"){
            if(!api.post){
                return param[1].status(405).json("Wrong HTTP method")
            }
            
            const res = api.post(...param)
            return res
            
        }else if(req.method === "PUT"){
            if(!api.put){
                return param[1].status(405).json("Wrong HTTP method")
            }
            
            const res = api.put(...param)
            return res
            
        }else if(req.method === "DELETE"){
            if(!api.delete){
                return param[1].status(405).json("Wrong HTTP method")
            }
            
            const res = api.delete(...param)
            return res

        }
        console.log(param)
    }
    
    return api_fun
}





