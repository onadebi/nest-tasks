const appsettings = {
    app:{
        PORT: process.env.PORT || 3000,
        headers:{
            "x-powered-by": "Java",
            "author": "onax",
            "version": "v1"
        }
    }
};

export default appsettings;