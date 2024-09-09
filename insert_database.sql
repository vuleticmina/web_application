INSERT INTO company (name, address, services, map_location, contact_person, vacations) VALUES
('Garden Masters', 'Terazije 3, Belgrade, Serbia', 
    '[{"serviceName": "Garden design", "description": "Designing beautiful gardens", "price": 500}, {"serviceName": "Landscaping", "description": "Landscaping services", "price": 800}]',
    '44.8154, 20.4606',
    '{"person": "Miloš Vuković", "phone": "123456789"}',
    '[{"start": "2024-09-15", "end": "2024-09-31"}]'
),
('Nature’s Touch', 'Kneza Miloša 10, Belgrade, Serbis', 
    '[{"serviceName": "Fountain Installation", "description": "Installing beautiful fountains", "price": 700}, {"serviceName": "Plant Arrangement", "description": "Arranging plants aesthetically", "price": 400}]',
    '44.8100, 20.4600',
    '{"person": "Jelena Petrović", "phone": "987654321"}',
    '[{"start": "2024-08-01", "end": "2024-08-15"}]'
),
('Urban Greens', 'Bulevar Kralja Aleksandra 50, Belgrade, Serbia', 
    '[{"serviceName": "Urban garden design", "description": "Designing gardens in urban spaces", "price": 600}, {"serviceName": "Rooftop Landscaping", "description": "Landscaping rooftops", "price": 1000}]',
    '44.8200, 20.4600',
    '{"person": "Marko Ilić", "phone": "1122334455"}',
    '[{"start": "2024-09-01", "end": "2024-09-15"}]'
);

INSERT INTO user (username, password, first_name, last_name, gender, address, phone, email, role, company_id, registration_status) VALUES
('decorator1', '$2a$10$7CW0gpfO1yjazA1fkh1p7.vkRh/2BI7BTXnoG7oisrb3kWmJMpjHq', 'Decorator1FirstName', 'Decorator1LastName', 'M', 'Terazije 3, Belgrade, Serbia', '123456789', 'decorator1@example.com', 'DECORATOR', 2, 'APPROVED'),
('decorator2', '$2a$10$7CW0gpfO1yjazA1fkh1p7.vkRh/2BI7BTXnoG7oisrb3kWmJMpjHq', 'Decorator2FirstName', 'Decorator2LastName', 'F', 'Kneza Miloša 10, Belgrade, Serbia', '987654321', 'decorator2@example.com', 'DECORATOR', 2, 'APPROVED'),
('decorator3', '$2a$10$7CW0gpfO1yjazA1fkh1p7.vkRh/2BI7BTXnoG7oisrb3kWmJMpjHq', 'Decorator3FirstName', 'Decorator3LastName', 'M', 'Bulevar Kralja Aleksandra 50, Belgrade, Serbia', '1122334455', 'decorator3@example.com', 'DECORATOR', 3, 'APPROVED'),
('owner1', '$2a$10$7CW0gpfO1yjazA1fkh1p7.vkRh/2BI7BTXnoG7oisrb3kWmJMpjHq', 'Owner1FirstName', 'Owner1LastName', 'F', 'Terazije 5, Belgrade, Serbia', '2233445566', 'owner1@example.com', 'OWNER', NULL, 'PENDING'),
('owner2', '$2a$10$7CW0gpfO1yjazA1fkh1p7.vkRh/2BI7BTXnoG7oisrb3kWmJMpjHq', 'Owner2FirstName', 'Owner2LastName', 'M', 'Kneza Miloša 20, Belgrade, Serbia', '6677889900', 'owner2@example.com', 'OWNER', NULL, 'PENDING'),
('admin', '$2a$10$7CW0gpfO1yjazA1fkh1p7.vkRh/2BI7BTXnoG7oisrb3kWmJMpjHq', 'AdminFirstName', 'AdminLastName', 'M', 'Bulevar Kralja Aleksandra 100, Brlgrade, Serbia', '9988776655', 'admin@example.com', 'ADMIN', NULL, 'APPROVED');


INSERT INTO arranging (
    owner_id, 
    company_id, 
    decorator_id, 
    booking_datetime, 
    realisation_date, 
    last_servicing_date, 
    area, 
    type, 
    pool_area, 
    green_area, 
    furniture_area, 
    fountain_area, 
    tables_number, 
    chairs_number, 
    layout, 
    options, 
    additional_requirements, 
    status, 
    servicing_status, 
    rating, 
    comment, 
    rejection_comment, 
    picture
) VALUES
( -- BOOKED, CANT CANCEL
    5,  -- owner_id
    1,  -- company_id
    NULL,  -- decorator_id
    '2024-09-01 10:00:00',  -- booking_datetime
    '2024-09-8 15:00:00',  -- realisation_date
    NULL,  -- last_servicing_date
    150.00,  -- area
    'private',  -- type
    20.00,  -- pool_area
    30.00,  -- green_area
    10.00,  -- furniture_area
    5.00,  -- fountain_area
    4,  -- tables_number
    10,  -- chairs_number
    '[{"type":"rectangle","x":10,"y":20,"width":100,"height":50,"radius":0,"color":"#FF5733","object":"pool"},{"type":"circle","x":150,"y":100,"width":0,"height":0,"radius":30,"color":"#33FF57","object":"fountain"}]',  -- layout
    '["Include lighting options"]',  -- options
    'Add additional seating area',  -- additional_requirements
    'BOOKED',  -- status
    'ACCEPTED',  -- servicing_status
    NULL,  -- rating
    '',  -- comment
    '',  -- rejection_comment
    NULL  -- picture
),
( -- BOOKED, CAN CANCEL
    5,  -- owner_id
    1,  -- company_id
    NULL,  -- decorator_id
    '2024-09-01 10:00:00',  -- booking_datetime
    '2024-09-15 15:00:00',  -- realisation_date
    NULL,  -- last_servicing_date
    150.00,  -- area
    'private',  -- type
    20.00,  -- pool_area
    30.00,  -- green_area
    10.00,  -- furniture_area
    5.00,  -- fountain_area
    4,  -- tables_number
    10,  -- chairs_number
    '[{"type":"rectangle","x":10,"y":20,"width":100,"height":50,"radius":0,"color":"#FF5733","object":"pool"},{"type":"circle","x":150,"y":100,"width":0,"height":0,"radius":30,"color":"#33FF57","object":"fountain"}]',  -- layout
    '["Include lighting options"]',  -- options
    'Add additional seating area',  -- additional_requirements
    'BOOKED',  -- status
    'ACCEPTED',  -- servicing_status
    NULL,  -- rating
    '',  -- comment
    '',  -- rejection_comment
    NULL  -- picture
),
( -- PAST, NOT DONE, DECORATOR BLOCKED FOR NOT UPLOADING PHOTOS
    5,  -- owner_id
    2,  -- company_id
    2,  -- decorator_id
    '2024-09-01 10:00:00',  -- booking_datetime
    '2024-09-05 15:00:00',  -- realisation_date
    NULL,  -- last_servicing_date
    150.00,  -- area
    'private',  -- type
    20.00,  -- pool_area
    30.00,  -- green_area
    10.00,  -- furniture_area
    5.00,  -- fountain_area
    4,  -- tables_number
    10,  -- chairs_number
    '[{"type":"rectangle","x":10,"y":20,"width":100,"height":50,"radius":0,"color":"#FF5733","object":"pool"},{"type":"circle","x":150,"y":100,"width":0,"height":0,"radius":30,"color":"#33FF57","object":"fountain"}]',  -- layout
    '["Include lighting options"]',  -- options
    'Add additional seating area',  -- additional_requirements
    'BOOKED',  -- status
    'ACCEPTED',  -- servicing_status
    NULL,  -- rating
    '',  -- comment
    '',  -- rejection_comment
    NULL  -- picture
),
( -- PAST, DONE
    5,  -- owner_id
    2,  -- company_id
    2,  -- decorator_id
    '2024-01-10 09:00:00',  -- booking_datetime
    '2024-01-15 14:00:00',  -- realisation_date
    NULL,  -- last_servicing_date
    200.00,  -- area
    'restaurant',  -- type
    30.00,  -- pool_area
    40.00,  -- green_area
    15.00,  -- furniture_area
    10.00,  -- fountain_area
    6,  -- tables_number
    20,  -- chairs_number
    '[{"type":"rectangle","x":20,"y":30,"width":150,"height":70,"radius":0,"color":"#FF5733","object":"garden"},{"type":"circle","x":200,"y":150,"width":0,"height":0,"radius":40,"color":"#33FF57","object":"fountain"}]',  -- layout
    '["Add music system"]',  -- options
    'Ensure proper cleaning before event',  -- additional_requirements
    'COMPLETED',  -- status
    'ACCEPTED',  -- servicing_status
    5,  -- rating
    'Sve super',  -- comment
    '',  -- rejection_comment
    NULL  -- picture
),
( -- PAST, DONE
    5,  -- owner_id
    2,  -- company_id
    2,  -- decorator_id
    '2023-01-10 09:00:00',  -- booking_datetime
    '2023-05-15 14:00:00',  -- realisation_date
    '2024-01-15 14:00:00',  -- last_servicing_date
    200.00,  -- area
    'restaurant',  -- type
    30.00,  -- pool_area
    40.00,  -- green_area
    15.00,  -- furniture_area
    10.00,  -- fountain_area
    6,  -- tables_number
    20,  -- chairs_number
    '[{"type":"rectangle","x":20,"y":30,"width":150,"height":70,"radius":0,"color":"#FF5733","object":"garden"},{"type":"circle","x":200,"y":150,"width":0,"height":0,"radius":40,"color":"#33FF57","object":"fountain"}]',  -- layout
    '["Add music system"]',  -- options
    'Ensure proper cleaning before event',  -- additional_requirements
    'COMPLETED',  -- status
    'ACCEPTED',  -- servicing_status
    NULL,  -- rating
    '',  -- comment
    '',  -- rejection_comment
    NULL  -- picture
),
( -- PAST, DONE
    5,  -- owner_id
    2,  -- company_id
    2,  -- decorator_id
    '2024-01-10 09:00:00',  -- booking_datetime
    '2024-01-15 14:00:00',  -- realisation_date
    NULL,  -- last_servicing_date
    200.00,  -- area
    'restaurant',  -- type
    30.00,  -- pool_area
    40.00,  -- green_area
    15.00,  -- furniture_area
    10.00,  -- fountain_area
    6,  -- tables_number
    20,  -- chairs_number
    '[{"type":"rectangle","x":20,"y":30,"width":150,"height":70,"radius":0,"color":"#FF5733","object":"garden"},{"type":"circle","x":200,"y":150,"width":0,"height":0,"radius":40,"color":"#33FF57","object":"fountain"}]',  -- layout
    '["Add music system"]',  -- options
    'Ensure proper cleaning before event',  -- additional_requirements
    'COMPLETED',  -- status
    'ACCEPTED',  -- servicing_status
    5,  -- rating
    'Sve super',  -- comment
    '',  -- rejection_comment
    NULL  -- picture
),
( -- PAST, DONE (LESS THAN 24h)
    5,  -- owner_id
    2,  -- company_id
    1,  -- decorator_id
    '2024-01-10 09:00:00',  -- booking_datetime
    '2024-09-09 14:00:00',  -- realisation_date
    NULL,  -- last_servicing_date
    200.00,  -- area
    'restaurant',  -- type
    30.00,  -- pool_area
    40.00,  -- green_area
    15.00,  -- furniture_area
    10.00,  -- fountain_area
    6,  -- tables_number
    20,  -- chairs_number
    '[{"type":"rectangle","x":20,"y":30,"width":150,"height":70,"radius":0,"color":"#FF5733","object":"garden"},{"type":"circle","x":200,"y":150,"width":0,"height":0,"radius":40,"color":"#33FF57","object":"fountain"}]',  -- layout
    '["Add music system"]',  -- options
    'Ensure proper cleaning before event',  -- additional_requirements
    'COMPLETED',  -- status
    'ACCEPTED',  -- servicing_status
    NULL,  -- rating
    '',  -- comment
    '',  -- rejection_comment
    NULL  -- picture
),
( -- PAST, DONE
    5,  -- owner_id
    2,  -- company_id
    2,  -- decorator_id
    '2024-01-10 09:00:00',  -- booking_datetime
    '2024-01-15 14:00:00',  -- realisation_date
    NULL,  -- last_servicing_date
    200.00,  -- area
    'restaurant',  -- type
    30.00,  -- pool_area
    40.00,  -- green_area
    15.00,  -- furniture_area
    10.00,  -- fountain_area
    6,  -- tables_number
    20,  -- chairs_number
    '[{"type":"rectangle","x":20,"y":30,"width":150,"height":70,"radius":0,"color":"#FF5733","object":"garden"},{"type":"circle","x":200,"y":150,"width":0,"height":0,"radius":40,"color":"#33FF57","object":"fountain"}]',  -- layout
    '["Add music system"]',  -- options
    'Ensure proper cleaning before event',  -- additional_requirements
    'COMPLETED',  -- status
    'ACCEPTED',  -- servicing_status
    5,  -- rating
    'Sve super',  -- comment
    '',  -- rejection_comment
    NULL  -- picture
),
( -- PAST, DONE, SERVICING BOOKED
    5,  -- owner_id
    2,  -- company_id
    2,  -- decorator_id
    '2023-01-10 09:00:00',  -- booking_datetime
    '2023-05-15 14:00:00',  -- realisation_date
    '2024-01-15 14:00:00',  -- last_servicing_date
    200.00,  -- area
    'restaurant',  -- type
    30.00,  -- pool_area
    40.00,  -- green_area
    15.00,  -- furniture_area
    10.00,  -- fountain_area
    6,  -- tables_number
    20,  -- chairs_number
    '[{"type":"rectangle","x":20,"y":30,"width":150,"height":70,"radius":0,"color":"#FF5733","object":"garden"},{"type":"circle","x":200,"y":150,"width":0,"height":0,"radius":40,"color":"#33FF57","object":"fountain"}]',  -- layout
    '["Add music system"]',  -- options
    'Ensure proper cleaning before event',  -- additional_requirements
    'COMPLETED',  -- status
    'BOOKED',  -- servicing_status
    NULL,  -- rating
    '',  -- comment
    '',  -- rejection_comment
    NULL  -- picture
)
,
( -- PAST, DONE, SERVICING BOOKED
    5,  -- owner_id
    2,  -- company_id
    2,  -- decorator_id
    '2023-01-10 09:00:00',  -- booking_datetime
    '2023-05-15 14:00:00',  -- realisation_date
    '2024-01-15 14:00:00',  -- last_servicing_date
    200.00,  -- area
    'restaurant',  -- type
    30.00,  -- pool_area
    40.00,  -- green_area
    15.00,  -- furniture_area
    10.00,  -- fountain_area
    6,  -- tables_number
    20,  -- chairs_number
    '[{"type":"rectangle","x":20,"y":30,"width":150,"height":70,"radius":0,"color":"#FF5733","object":"garden"},{"type":"circle","x":200,"y":150,"width":0,"height":0,"radius":40,"color":"#33FF57","object":"fountain"}]',  -- layout
    '["Add music system"]',  -- options
    'Ensure proper cleaning before event',  -- additional_requirements
    'COMPLETED',  -- status
    'BOOKED',  -- servicing_status
    NULL,  -- rating
    '',  -- comment
    '',  -- rejection_comment
    NULL  -- picture
)
;

