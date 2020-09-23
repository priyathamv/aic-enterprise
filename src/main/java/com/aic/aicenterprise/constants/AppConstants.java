package com.aic.aicenterprise.constants;

public class AppConstants {
    private AppConstants() {}

    private static final String BASE_PATH = "/api";

    public static final String AUTH_PATH = "/auth";

    public static final String USER_PATH = BASE_PATH + "/users";

    public static final String PRODUCTS_PATH = BASE_PATH + "/products";

    public static final String SUBSCRIBERS_PATH = BASE_PATH + "/subscribers";

    public static final String CART_PATH = BASE_PATH + "/cart";

    public static final String ORDERS_PATH = BASE_PATH + "/orders";

    /* JWT Auth Constants */
    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
}
