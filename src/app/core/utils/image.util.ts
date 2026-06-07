// export class ImageUtil {

//   static resolve(
//     path?: string | null
//   ): string {

//     if (!path) {

//       return 'assets/img/no-image.png';
//     }



//     if (
//       path.startsWith('http')
//     ) {

//       return path;
//     }

   
//     return `/api/hitbox${path}`;
//   }
// }

export class ImageUtil {

  static resolve(
    key?: string | null
  ): string {

    if (!key) {
      return 'assets/img/no-image.png';
    }

    return `/api/hitbox/files?key=${encodeURIComponent(key)}`;
  }
}