// grab some of the important stuff within our dom

// function to send a json object
const respondJSON = (request, response, status, object, contentType) => {
    // set status code and content type (application/json)
    response.writeHead(status, { 'Content-Type': `${contentType}` });
    // stringify the object (so it doesn't use references/pointers/etc)
    // but is instead a flat string object.
    // Then write it to the response.
    response.write(JSON.stringify(object));
    // Send the response to the client
    response.end();
};

// function to show a success status code
const success = (request, response, acceptedTypes) => {
    // message to send
    const responseJSON = {
        message: 'This is a successful response',
    };
    // if the client's most preferred type (first option listed)
    // is xml, then respond xml instead
    if (acceptedTypes[0] === 'text/xml') {
        // create a valid XML string with name and age tags.
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} </response>`;
        // return response passing out string and content type
        return respondJSON(request, response, 200, responseXML, 'text/xml');

    }
    // return response passing json and content type
    return respondJSON(request, response, 200, responseJSON, 'application/json');
};

// function to show not found error
const notFound = (request, response, acceptedTypes) => {
    // error message with a description and consistent error id
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };

    if (acceptedTypes[0] === 'text/xml') {
        // create a valid XML string with name and age tags.
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} <id>${responseJSON.id}</id>`
        responseXML = `${responseXML} </response>`;
        // return response passing out string and content type
        return respondJSON(request, response, 404, responseXML, 'text/xml');

    }
    // return response passing json and content type
    return respondJSON(request, response, 404, responseJSON, 'application/json');
};

//function to show a bad request without the correct parameters
const badRequest = (request, response, acceptedTypes, params) => {
    //message to send
    const responseJSON = {
        message: 'This request has the required parameters',
    };

    //if the request does not contain a valid=true query parameter and is text/xml
    if ((!params.valid || params.valid !== 'true') && acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>Missing valid query parameter set to true</message>`;
        responseXML = `${responseXML} <id>badRequest</id>`
        responseXML = `${responseXML} </response>`;
        return respondJSON(request, response, 400, responseXML, 'text/xml');
    }
    //if the request does not contain a valid=true query parameter and is application/json
    else if ((!params.valid || params.valid !== 'true') && acceptedTypes[0] === 'application/json') {
        //set our error message
        responseJSON.message = 'Missing valid query parameter set to true';
        //give the error a consistent id 
        responseJSON.id = 'badRequest';
        //return our json with a 400 bad request code
        return respondJSON(request, response, 400, responseJSON, 'text/xml');
    }
    //direct connect without param
    else if ((!params.valid || params.valid !== 'true')) {
        //set our error message
        responseJSON.message = 'Missing valid query parameter set to true';
        //give the error a consistent id 
        responseJSON.id = 'badRequest';
        return respondJSON(request, response, 400, responseJSON, 'application/json');
    }
    else if(params.valid == 'true'){
        return respondJSON(request, response, 200, responseJSON, 'application/json');
    }

};

//function to show a bad request without the correct parameters
const unauthorized = (request, response, acceptedTypes, params) => {
    //message to send
    const responseJSON = {
        message: 'You have successfully viewed the content',
    };

    //if the request does not contain a valid=true query parameter and is text/xml
    if ((!params.loggedIn || params.loggedIn !== 'yes') && acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>Missing loggedIn query parameter set to yes</message>`;
        responseXML = `${responseXML} <id>unathorized</id>`
        responseXML = `${responseXML} </response>`;
        return respondJSON(request, response, 401, responseXML, 'text/xml');
    }
    //if the request does not contain a valid=true query parameter and is application/json
    else if ((!params.loggedIn || params.loggedIn !== 'yes') && acceptedTypes[0] === 'application/json') {
        //set our error message
        responseJSON.message = 'Missing loggedIn query parameter set to yes';
        //give the error a consistent id 
        responseJSON.id = 'unathorized';
        //return our json with a 400 bad request code
        return respondJSON(request, response, 401, responseJSON, 'text/xml');
    }
    //direct connect without param
    else if ((!params.loggedIn || params.loggedIn !== 'yes')) {
        //set our error message
        responseJSON.message = 'Missing loggedIn query parameter set to yes';
        //give the error a consistent id 
        responseJSON.id = 'unathorized';
        return respondJSON(request, response, 401, responseJSON, 'application/json');
    }
    else if(params.loggedIn == 'yes'){
        return respondJSON(request, response, 200, responseJSON, 'application/json');
    }

};

// function to show a forbidden status code
const forbidden = (request, response, acceptedTypes) => {
    // message to send
    const responseJSON = {
        message: 'You do not have access to this content',
        id:'forbidden'
    };
    // if the client's most preferred type (first option listed)
    // is xml, then respond xml instead
    if (acceptedTypes[0] === 'text/xml') {
        // create a valid XML string with name and age tags.
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
        responseXML = `${responseXML} </response>`;
        // return response passing out string and content type
        return respondJSON(request, response, 403, responseXML, 'text/xml');

    }
    // return response passing json and content type
    return respondJSON(request, response, 403, responseJSON, 'application/json');
};

// function to show a forbidden status code
const internal = (request, response, acceptedTypes) => {
    // message to send
    const responseJSON = {
        message: 'Internal service error. Something went wrong',
        id:'internalError'
    };
    // if the client's most preferred type (first option listed)
    // is xml, then respond xml instead
    if (acceptedTypes[0] === 'text/xml') {
        // create a valid XML string with name and age tags.
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
        responseXML = `${responseXML} </response>`;
        // return response passing out string and content type
        return respondJSON(request, response, 500, responseXML, 'text/xml');

    }
    // return response passing json and content type
    return respondJSON(request, response, 500, responseJSON, 'application/json');
};

// function to show a forbidden status code
const notImplemented = (request, response, acceptedTypes) => {
    // message to send
    const responseJSON = {
        message: 'A get request for this page has not been implemented yet. Check again later for updated content',
        id:'notImplemented'
    };
    // if the client's most preferred type (first option listed)
    // is xml, then respond xml instead
    if (acceptedTypes[0] === 'text/xml') {
        // create a valid XML string with name and age tags.
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
        responseXML = `${responseXML} </response>`;
        // return response passing out string and content type
        return respondJSON(request, response, 501, responseXML, 'text/xml');

    }
    // return response passing json and content type
    return respondJSON(request, response, 501, responseJSON, 'application/json');
};

module.exports = {
    notFound,
    success,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplemented

};
