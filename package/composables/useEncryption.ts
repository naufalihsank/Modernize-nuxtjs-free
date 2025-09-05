// composables/useEncryption.js
export async function importKey(base64Key) {
  const rawKey = Uint8Array.from(atob(base64Key), c => c.charCodeAt(0));

  return await crypto.subtle.importKey(
    "raw",
    rawKey,
    { name: "AES-GCM" },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function encryptMessage(plaintext, key) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);

  const nonce = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: nonce },
    key,
    data
  );

  const combined = new Uint8Array(nonce.length + ciphertext.byteLength);
  combined.set(nonce, 0);
  combined.set(new Uint8Array(ciphertext), nonce.length);

  return btoa(String.fromCharCode(...combined));
}