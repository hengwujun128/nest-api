// We'll use this to share our key between the JWT signing and verifying steps.
// sign 和 verifying  两步都会用到这个密钥
export const jwtConstants = {
  // secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
  secret: 'abcdefghijklmnopqrstuvwxyz',
}
