declare module "discord.js" {
    export interface Client {
        commands: Collection<any,any>
    }
}
export {}