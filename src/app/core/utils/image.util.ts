export class ImageUtil {

  static resolve(
    path?: string | null
  ): string {

    if (!path) {

      return 'assets/img/no-image.png';
    }

    /* ============================
       JÁ É URL COMPLETA
    ============================ */

    if (
      path.startsWith('http')
    ) {

      return path;
    }

    /* ============================
       UPLOADS
    ============================ */

    return `/api/hitbox${path}`;
  }
}