import { Connection, Keypair, SystemProgram, PublicKey } from
"@solana/web3.js"
import { Program, Wallet, AnchorProvider, Address } from
"@project-serum/anchor"
import { WbaPrereq, IDL } from "./programs/wba_prereq";
import wallet from "./dev-wallet.json"
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com");
const github = Buffer.from("vivekjami", "utf8");
const provider = new AnchorProvider(connection, new Wallet(keypair), {
commitment: "confirmed"});
const program = new Program<WbaPrereq>(IDL,
    "HC2oqz2p6DEWfrahenqdq2moUcga9c9biqRBcdK3XKU1" as Address, provider);
const enrollment_seeds = [Buffer.from("prereq"),
keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] =
PublicKey.findProgramAddressSync(enrollment_seeds, program.programId);
(async () => {
    try {
    const txhash = await program.methods
    .complete(github)
    .accounts({
    signer: keypair.publicKey,
    prereq: enrollment_key,
    systemProgram: SystemProgram.programId,
    })
    .signers([
    keypair
    ]).rpc();
    console.log(`Success! Check out your TX here:
    https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    } catch(e) {
    console.error(`Oops, something went wrong: ${e}`)
    }
    })();


// Success! Check out your TX here:
// https://explorer.solana.com/tx/5No2LVN4SQf6GtKBRQ36XY4eEpSQ83oRWRc5uiqPTqxj1mxA3yn5uerdRHpJrfsYJyzxj2rTnhcEAj349HTw9V1q?cluster=devnet