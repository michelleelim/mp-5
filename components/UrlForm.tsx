"use client";
import createShortUrl from "@/lib/createShortUrl";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function URLForm() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [error, setError] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [copied, setCopied] = useState(false);

    return (
        <form className="url-form"
            onSubmit={async (event) => {
                event.preventDefault();
                setError("");
                setShortUrl("");

                createShortUrl(url, alias)
                    .then((result) => {
                        if (result.error) {
                            setError(result.error);
                        } else {
                            setShortUrl(
                                `${window.location.origin}/${result.alias}`
                            );
                        }
                    })
                    .catch(() => setError("Something went wrong."));
            }}
        >
            <TextField
                required
                variant="filled"
                sx={{ backgroundColor: "white", width: "100%" }}
                label="Original URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />

            <TextField
                required
                sx={{
                    backgroundColor: "white",
                    width: "100%"
                }}
                variant="filled"
                label="Custom Alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
            />

            <Button
                variant="contained"
                type="submit"
            >
                Shorten
            </Button>

            {error && (
                <p className="error">{error}</p>
            )}

            {shortUrl && (
                <div className="result">
                    <p>Your shortened URL:</p>
                    <div className="result-row">
                        <a href={shortUrl}> {shortUrl} </a>
                            <Button
                                variant="outlined"
                                type="button"
                                onClick={ async () => {
                                    await navigator.clipboard.writeText(shortUrl);
                                    setCopied(true);
                                }}
                            >
                                {copied ? "Copied ✓": "Copy Link"}
                            </Button>
                    </div>
                </div>
            )}
        </form>
    );
}