package org.wembleywonders.entity;

public @interface Column {

    boolean nullable();

    boolean updatable();

    int precision();

    int scale();

    boolean unique();

}
