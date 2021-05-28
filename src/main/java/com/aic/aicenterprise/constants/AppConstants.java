package com.aic.aicenterprise.constants;

public class AppConstants {
    private AppConstants() {}

    /* Endpoints */
    private static final String BASE_PATH = "/api";

    public static final String AUTH_PATH = "/auth";

    public static final String USER_PATH = BASE_PATH + "/users";

    public static final String PRODUCTS_PATH = BASE_PATH + "/products";

    public static final String ANALYTICAL_PRODUCTS_PATH = BASE_PATH + "/analytical-products";
    public static final String LIFE_SCIENCE_PRODUCTS_PATH = BASE_PATH + "/life-science-products";
    public static final String INSTRUMENTATION_PRODUCTS_PATH = BASE_PATH + "/instrumentation-products";
    public static final String INDUSTRIAL_PRODUCTS_PATH = BASE_PATH + "/industrial-products";

    public static final String ANALYTICAL_PRODUCT_SERVICE_BEAN = "AnalyticalProductServiceBean";
    public static final String LIFE_SCIENCE_PRODUCT_SERVICE_BEAN = "LifeScienceProductServiceBean";
    public static final String INSTRUMENTATION_PRODUCT_SERVICE_BEAN = "InstrumentationProductServiceBean";
    public static final String INDUSTRIAL_PRODUCT_SERVICE_BEAN = "IndustrialProductServiceBean";

    public static final String FEATURED_PRODUCTS_PATH = BASE_PATH + "/featured-products";

    public static final String BRANDS_PATH = BASE_PATH + "/brands";
    public static final String CATEGORY_PATH = BASE_PATH + "/category";
    public static final String DIVISION_PATH = BASE_PATH + "/division";

    public static final String SUBSCRIBERS_PATH = BASE_PATH + "/subscribers";

    public static final String CART_PATH = BASE_PATH + "/cart";

    public static final String ORDERS_PATH = BASE_PATH + "/orders";

    /* JWT Auth Constants */
    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";

    public static final String SUCCESS = "success";
    public static final String ADMIN = "admin";
    public static final String APP_DOMAIN = "https://aicgroup.co.in";
    public static final String TAMIL_NADU = "Tamil Nadu";
}
