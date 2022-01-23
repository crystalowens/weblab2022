const metadataFormats = {
    "opensea" : {
        name : "name", 
        description : "description", 
        image : "image"
    }, 
    "cryptoskulls" : {
        name : "name", 
        description : "description", 
        image : "image"
    }, 
    "cryptokitties" : {
        name : "name", 
        description : "bio", 
        image : "image_url"
    },
    "moralis" : {
        name : "name", 
        description : "description", 
        image : "image"
    },
    "larvalabs" : {
        name : "name", 
        description : "description", 
        image : "image"
    }
};

function findMetadataFormat(tokenUri){
    for(const format in metadataFormats){
        if (tokenUri.includes(format)){
            return metadataFormats[format];
        } 
    }
    return null;
}
function isFormattableMetadata(tokenUri){
    const translation = findMetadataFormat(tokenUri);
    return translation != null;
}

function fixIfpsFormat(image){
    if(image.includes("ipfs://ipfs/")){
        return `https://ipfs.io/ipfs/${image.substring("ipfs://ipfs/".length)}`;
    }
    else if(image.includes("ipfs://")){
        return `https://ipfs.io/ipfs/${image.substring("ipfs://".length)}`;
    }
    return image;
}
function fixNoDescription(description){
    if(!description){ return "No description included";}
    return description;
}

function formatMetadata(metadata, token_uri){
    const format = findMetadataFormat(token_uri);
    return {
        name : metadata[format.name],
        description : fixNoDescription(metadata[format.description]),
        image : fixIfpsFormat(metadata[format.image])
    };
}


//they take too long to load
const bannedImageLinks = ["ipfs"];

function isValidMetadata(metadata){
    if(metadata.image){
        for(const imageLink of bannedImageLinks){
            if(metadata.image.includes(imageLink))
                return false;
        }
    }
    return !!metadata && !!metadata.name && !!metadata.image && !!metadata.description;
}

module.exports = {
    isFormattableMetadata : isFormattableMetadata,
    formatMetadata : formatMetadata,
    isValidMetadata : isValidMetadata
};