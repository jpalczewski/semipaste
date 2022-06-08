export const handleURL = (
    url: string,
    URLvalue: string | null,
    URLarg: string,
    valueToSet: string,
    ) => {
    if (url === "" && valueToSet !== "") {
        url += `&${URLarg}=${valueToSet}`;
    }
    else {
        if (URLvalue === null && valueToSet !== "") {
            url += `&${URLarg}=${valueToSet}`;
        }
        else {
            if (URLvalue !== valueToSet) {
                if (valueToSet === "") {
                    let toReplace = `${URLarg}=${URLvalue}`;
                    if (url.includes(`&${URLarg}`)) toReplace = "&" + toReplace;
                    url = url.replace(toReplace, "");
                }
                else {
                    let toReplace = `${URLarg}=${URLvalue}`;
                    let toSet = `${URLarg}=${valueToSet}`;
                    if (url.includes(`&${URLarg}`)) {
                        toReplace = "&" + toReplace;
                        toSet = "&" + toSet;
                    }
                    url = url.replace(toReplace, toSet);
                }
            }
        }
    }
    return url;
}

export const clearURL = (
    url: string,
    URLarg: string,
    URLvalue: string | null,
) => {
    if (URLvalue !== null) {
        let toReplace = `${URLarg}=${URLvalue}`;
        if (url.includes("&author")) toReplace = "&" + toReplace;
        url = url.replace(toReplace, "");
    }
    return url;
}
