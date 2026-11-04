const appsettings = {
    app:{
        PORT: process.env.PORT || 3000,
        headers:{
            "x-powered-by": "Java",
            "author": "onax",
            "version": "v1"
        },
        latencyThreshold: process.env.LATENCY_THRESHOLD ? parseInt(process.env.LATENCY_THRESHOLD) : 5000
    }
};

export default appsettings;