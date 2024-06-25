FROM php:8.2-fpm

# Обновляем
RUN apt-get update && \
    apt-get install -y --no-install-recommends

# Установка рабочего каталога
WORKDIR /var/www/public/

# xdebug
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

# Установка расширения zip для работы с composer
RUN apt-get install -y zip unzip

# Установка расширения git для работы с composer
RUN apt-get install -y git

# Установка Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Установка часового пояса Москвы
RUN ln -sf /usr/share/zoneinfo/Europe/Moscow /etc/localtime