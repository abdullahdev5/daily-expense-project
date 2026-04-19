import axios from "axios";


export const getMerchantLogoDomain = (merchantName: string) => {
    const cleanName = merchantName
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '')
        .replace(/[!^a-z0-9]/g, '');

    return `${cleanName}.com`;
}


export const getMerchantLogoUrl = async (domain: string): Promise<string | null> => {
    const url = `https://logos.hunter.io/${domain}`;
    
    try {
        const response = await axios.head(url);

        return response.status === 200 ? url : null
    } catch (e) {
        return null;
    }
}