"use server";
import getCollection, { URLS_COLLECTION } from "@/db";

export default async function getUrlByAlias(alias: string) {
    const urlCollection = await getCollection(URLS_COLLECTION);
    const result = await urlCollection.findOne({ alias: alias });

    if (!result) {
        return null;
    }
    return result.url;
}