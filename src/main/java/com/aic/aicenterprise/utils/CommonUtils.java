package com.aic.aicenterprise.utils;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class CommonUtils {
    private CommonUtils() {}

    public static Pageable getPageObject(int pageNo, int limit) {
        return PageRequest.of(pageNo, limit);
    }

}
