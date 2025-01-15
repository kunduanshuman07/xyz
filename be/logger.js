
const levels = {
    info: "INFO",
    error: "ERROR",
    success: "SUCCESS"
};

const log = (level, message) => {
    const timestamp = new Date().toISOString();
    if (level === 'INFO') {
        console.log(`${timestamp} ${level} ${message}`);
    }
    else if (level === 'ERROR') {
        console.log(`${level} : ${message}`)
    }
    else if (level === 'SUCCESS') {
        console.log(`${level}`);
    }
};

export const logger = {
    info: (message) => log(levels.info, message),
    error: (message) => log(levels.error, message),
    success: (message) => log(levels.success, message),
};
