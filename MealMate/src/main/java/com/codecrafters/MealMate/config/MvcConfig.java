package com.codecrafters.MealMate.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
        registry.addViewController("/login").setViewName("login");
        registry.addViewController("/register").setViewName("register");
        registry.addViewController("/recipes").setViewName("searchRecipe");
        registry.addViewController("/recipes/{id}").setViewName("recipeDetails");
        registry.addViewController("/supermarkets").setViewName("supermarketSearch");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images")
                .addResourceLocations("classpath:/static/","classpath:/images/")
                .setCachePeriod(0);

        registry.addResourceHandler("/files")
                .addResourceLocations("classpath:/static/","classpath:/files/")
                .setCachePeriod(0);
    }
}
