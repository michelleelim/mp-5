"use server";
import getCollection, { URLS_COLLECTION } from "@/db";
import { MongoServerError } from "mongodb";

export default async function createShortUrl(
    url: string,
    alias: string,
) {
    //validate URL
    try {
        const parsedUrl = new URL(url);

        if (parsedUrl.protocol !== "http:" &&
            parsedUrl.protocol !== "https:") {
            return { error: "Invalid URL. Must start with http:// or https://" };
        }
    } catch {
        return { error: "Invalid URL. Must start with http:// or https://" };
    }

    //validate [alias]
    alias = alias.trim();
    if (!/^[a-zA-Z0-9_-]+$/.test(alias)) {
        return { error: "Please enter a valid [alias]." };
    }

    const urlCollection = await getCollection(URLS_COLLECTION);

    //check if [alias] already exists
    console.log("Checking alias:", alias);
    const existing = await urlCollection.findOne({ alias: alias });

    console.log("Existing document:", existing);
    if (existing) {
        return { error: `The alias "${alias}" already exists.` };
    }

    //create new document
    const newUrl = {
        url: url,
        alias: alias,
    };

    //insert in DB
    try {
        const res = await urlCollection.insertOne(newUrl);

        if (!res.acknowledged) {
            return { error: "DB insert failed." };
        }
    } catch (error) {
        console.log(error);
        if (error instanceof MongoServerError && error.code === 11000) {
            return { error: `The alias "${alias}" already exists.` };
        }
        return { error: "Unable to create shortened URL" };
    }
    return { alias: alias };
}