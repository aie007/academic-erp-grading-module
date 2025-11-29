package com.academicerp.backend.service;

import com.academicerp.backend.entity.Employee;
import com.academicerp.backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    EmployeeRepository employeeRepo;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) {
        OAuth2User user = super.loadUser(request);

        String email = user.getAttribute("email");
        String name = user.getAttribute("name");

//        if(email.startsWith(("emp."))) {
            employeeRepo.findByEmail(email).orElseGet(() -> {
                Employee faculty = new Employee();
                faculty.setEmail(email);
                faculty.setName(name);
                return employeeRepo.save(faculty);
            });
            return user;
//        }
//        else {
//            throw new OAuth2AuthenticationException(new OAuth2Error(
//                    "unauthorized_email",
//                    "Only employee emails are allowed",
//                    "http://localhost:8080/login"
//            ));
//        }

    }
}

